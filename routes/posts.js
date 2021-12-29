const router = require("express").Router();
const uuid = require("uuid");
const client = require("../redis_connect.js");
const authenticateToken = require("../middleware/authenticateToken");
const validate = require("../validate");

// Get All Posts in db
router.get("/", authenticateToken, async (req, res) => {
  const result = await client.ft.search("idx:posts", "*", {
    SORTBY: { BY: "createdAt", DIRECTION: "DESC" },
  });
  const posts = result.documents.map((doc) => JSON.parse(doc.value["$"]));
  return res.json({ posts });
});

// Get 100 latest posts from followed users
router.get("/following", authenticateToken, async (req, res) => {
  const ids = await client.zRange(`following:${req.user.id}`, 0, -1);
  const query = ids
    .map((id, index) =>
      index !== ids.length - 1 ? `@userId:${id} | ` : `@userId:${id}`
    )
    .join("");
  const result = await client.ft.search("idx:posts", query, {
    SORTBY: { BY: "createdAt", DIRECTION: "DESC" },
    LIMIT: { from: 0, size: 100 },
  });
  const posts = result.documents.map((doc) => JSON.parse(doc.value["$"]));
  return res.json({ posts });
});

// Make a post
router.post("/", authenticateToken, async (req, res) => {
  const { error } = validate.postValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { title, description, img } = req.body;
  const { id, name } = req.user;
  const postId = uuid.v4();
  const post = {
    id: postId,
    userId: id,
    title,
    description,
    username: name,
    createdAt: Date.now(),
    img,
  };

  try {
    // save to db
    await client.json.set(`post:${postId}`, `.`, post);
    return res.status(201).send();
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete a post by id
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const post = await client.json.get(`post:${id}`);
  if (!post) return res.status(401).json({ error: "Post not found" });
  if (post.userId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    await client.json.del(`post:${id}`);
    return res.status(201).send();
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update a post
router.put("/edit/:id", authenticateToken, async (req, res) => {
  const { error } = validate.postValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const id = req.params.id;
  const { title, description, img } = req.body;

  const post = await client.json.get(`post:${id}`);
  if (!post) return res.status(401).json({ error: "Post not found" });

  if (post.userId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    await client.json.set(`post:${id}`, `.title`, title);
    await client.json.set(`post:${id}`, `.description`, description);
    await client.json.set(`post:${id}`, `.img`, img);
    await client.json.set(`post:${id}`, `.updatedAt`, Date.now());
    return res.status(201).send();
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
