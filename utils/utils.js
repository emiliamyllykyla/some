const client = require("../redis_connect.js");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const saveUser = async ({ name, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuid.v4().replace(/-/g, "");
    const user = { name, id, img: "", password: hashedPassword };
    await client.hSet(`user:${id}`, user);
    return { error: false };
  } catch (error) {
    return { error };
  }
};

// Find user from DB by name, return user or null
const findUser = async (reqname) => {
  try {
    const result = await client.ft.search("idx:users", `@name:${reqname}`);
    return result.documents.length > 0 ? result.documents[0].value : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Get posts, sorted by createdAt
const findPostsByUserId = async (userId) => {
  try {
    const result = await client.ft.search("idx:posts", `@userId:${userId}`, {
      SORTBY: { BY: "createdAt", DIRECTION: "DESC" },
    });
    const posts = result.documents.map((doc) => JSON.parse(doc.value["$"]));
    return { posts, error: null };
  } catch (err) {
    console.log(err);
    return { posts: [], error: error };
  }
};

async function sequenceAsyncIterable(aiter, res = []) {
  const iterResult = await aiter.next();
  if (iterResult.done) {
    return res;
  }
  return sequenceAsyncIterable(aiter, [...res, iterResult.value]);
}

const addFollow = (key, score, value) => client.zAdd(key, { score, value });

const updateCount = (id, key, field) =>
  client.zCard(key).then((count) => client.hSet(`user:${id}`, field, count));

module.exports = {
  saveUser,
  findUser,
  findPostsByUserId,
  sequenceAsyncIterable,
  addFollow,
  updateCount,
};
