const { SchemaFieldTypes } = require("redis");
const client = require("./redis_connect.js");

async function createUsersIndex() {
  await client.ft.dropIndex("idx:users");
  await client.ft.create(
    "idx:users",
    {
      name: {
        type: SchemaFieldTypes.TEXT,
        sortable: true,
      },
    },
    {
      ON: "HASH",
      PREFIX: "user:",
    }
  );
}

async function createPostsIndex() {
  try {
    await client.ft.dropIndex("idx:posts");
  } catch {}
  await client.ft.create(
    "idx:posts",
    {
      "$.userId": {
        type: SchemaFieldTypes.TEXT,
        sortable: "UNF",
        AS: "userId",
      },
      "$.createdAt": {
        type: SchemaFieldTypes.NUMERIC,
        sortable: "UNF",
        AS: "createdAt",
      },
    },
    {
      ON: "JSON",
      PREFIX: "post:",
    }
  );
}

Promise.all([createUsersIndex(), createPostsIndex()]).then((res) => {
  process.exit();
});
