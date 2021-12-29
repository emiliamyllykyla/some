const router = require("express").Router();
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const jwt = require("../utils/jwt");
const validate = require("../validate");
const client = require("../redis_connect.js");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/token", authenticateToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

// Get users
router.get("/", async (req, res) => {
  let users = [];
  try {
    for await (const key of client.scanIterator({ MATCH: "user:*" })) {
      const { id, name } = await client.hGetAll(key);
      users.push({ id, name });
    }
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.json([]);
  }
});

// Get user by name
router.get("/:name", async (req, res) => {
  const userName = req.params.name;
  utils.findUser(userName).then((user) => {
    if (!user) return res.status(404).json({ error: "Profile not found" });
    const { password, ...rest } = user;
    return res.json({ user: rest });
  });
});

// Edit user img
router.put("/:name/edit", authenticateToken, async (req, res) => {
  const { error } = validate.userEditValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  utils.findUser(req.params.name).then((user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    client
      .hSet(`user:${user.id}`, req.body)
      .then(() => res.status(201).send())
      .catch(() => res.status(500).send({ error: "Server error" }));
  });
});

// Register
router.post("/", async (req, res) => {
  const { error } = validate.userValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  utils.findUser(req.body.name).then((user) => {
    if (user) return res.status(400).json({ error: "Username taken" });
    utils.saveUser(req.body).then((result) => {
      if (!result.error) return res.status(201).send();
      else return res.status(500).json({ error: "Server error" });
    });
  });
});

// Delete user
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;
    // Delete posts from Redis
    await utils.findPostsByUserId(id).then(async (res) => {
      if (res.error) return res.status(500).json({ error });
      return res.posts.forEach(async (post) => {
        await client.json.del(`post:${post.id}`);
      });
    });
    client.del(`user:${id}`);
    client.del("tokens", id);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validate.userValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const foundUser = await utils.findUser(req.body.name);
  if (!foundUser) return res.status(401).json({ error: "User not found" });
  const { id, name, password } = foundUser;
  try {
    const validPassword = await bcrypt.compare(req.body.password, password);
    if (validPassword) {
      // Create tokens and store as http only cookies
      const user = { id, name };
      jwt.makeNewToken(res, user, "refresh", "30d");
      jwt.makeNewToken(res, user, "access", "15m");
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/logout", authenticateToken, (req, res) => {
  client.hDel("tokens", req.user.id);
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  return res.sendStatus(204);
});

router.get("/:id/posts", authenticateToken, async (req, res) => {
  const id = req.params.id;
  await utils.findPostsByUserId(id).then((result) => {
    if (!result.error) return res.json({ posts: result.posts });
    else return res.status(500).json({ error: result.error });
  });
});

// Follow
router.post("/:name/follow", authenticateToken, async (req, res) => {
  return utils
    .findUser(req.params.name)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      const authId = req.user.id;
      const score = Date.now();
      const following = `following:${authId}`;
      const followers = `followers:${user.id}`;
      utils
        .addFollow(following, score, user.id)
        .then(() => utils.addFollow(followers, score, authId))
        .then(() => utils.updateCount(authId, following, "following"))
        .then(() => utils.updateCount(user.id, followers, "followers"))
        .then(() => res.status(201).send())
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((err) => res.status(500).json({ error: "Server error" }));
});

// Unfollow
router.post("/:name/unfollow", authenticateToken, async (req, res) => {
  const authId = req.user.id;
  return utils
    .findUser(req.params.name)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      const following = `following:${authId}`;
      const followers = `followers:${user.id}`;
      client
        .zRem(following, user.id)
        .then(() => client.zRem(followers, req.user.id))
        .then(() => utils.updateCount(authId, following, "following"))
        .then(() => utils.updateCount(user.id, followers, "followers"))
        .then(() => res.status(201).send())
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((err) => res.status(500).json({ error: "Server error" }));
});

// Check if current user is following a user
router.get("/:name/isfollowing", authenticateToken, async (req, res) => {
  return utils.findUser(req.params.name).then((user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    client
      .zRank(`following:${req.user.id}`, user.id)
      .then((result) =>
        result === null
          ? res.status(201).json({ isFollowing: false })
          : res.status(201).json({ isFollowing: true })
      )
      .catch(() => res.status(500).json({ error: "Server error" }));
  });
});

module.exports = router;
