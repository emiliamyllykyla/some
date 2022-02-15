const redis = require("redis");
const client = redis.createClient();
client.connect();
client.on("connect", function () {
  console.log("Connected to Redis");
});
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
