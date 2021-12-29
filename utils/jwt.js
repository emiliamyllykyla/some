const jwt = require("jsonwebtoken");
const client = require("../redis_connect.js");

const cookieOptions = {
  sameSite: "strict",
  secure: true,
  httpOnly: true,
};

function getSecret(type) {
  return type === "refresh"
    ? process.env.REFRESH_TOKEN_SECRET
    : process.env.ACCESS_TOKEN_SECRET;
}

function generateToken(user, type, time) {
  const SECRET = getSecret(type);
  try {
    const token = jwt.sign(user, SECRET, {
      expiresIn: time,
    });
    if (type === "refresh") {
      client.hSet("tokens", user.id, JSON.stringify(token));
    }
    return token;
  } catch (err) {
    console.log(err);
  }
}

const verifyJWT = (token, type) => {
  const SECRET = getSecret(type);
  try {
    const user = jwt.verify(token, SECRET);
    return { payload: user, expired: false };
  } catch (error) {
    return { payload: null, expired: error.name === "TokenExpiredError" };
  }
};

// Get user info from JWT
const getUser = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {
    ignoreExpiration: true,
  });
};

function makeNewToken(res, user, type, time) {
  const name = type + "Token";
  try {
    const newToken = generateToken(user, type, time);
    res.cookie(name, newToken, cookieOptions);
  } catch (err) {
    return res.status(403).json({
      error: `Error while generating ${name}: ${err}`,
    });
  }
}

module.exports = {
  generateToken,
  verifyJWT,
  getUser,
  makeNewToken,
};