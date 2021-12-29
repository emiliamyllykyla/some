const jwt = require("../utils/jwt");
const client = require("../redis_connect.js");

// Middleware for verifying jwt token
module.exports = async function authenticateToken(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: "Access denied" });
  }

  let { payload, expired } = jwt.verifyJWT(accessToken, "access");

  // Valid token, not expired
  if (payload) {
    const { id, name } = payload;
    req.user = { id, name };
    return next();
  }

  // Access token is valid but expired.
  // Try to verify refresh token.
  const { payload: refresh, expired: refreshExpired } = expired
    ? jwt.verifyJWT(refreshToken, "refresh")
    : { payload: null };

  // Get user id and name from the payload.
  // If there was an error, verify again but ignore expiration.
  const { id, name } = refresh ? refresh : jwt.getUser(refreshToken);
  const user = { id, name };

  // Get token from database
  const redisRefresh = await client.hGet("tokens", id, (err, val) => {
    return err ? null : val ? val : null;
  });

  // Compare refresh tokens in cookie and DB
  if (!redisRefresh || JSON.parse(redisRefresh) !== refreshToken) {
    return res.status(403).json({ error: "Invalid token" });
  }

  // New Refresh Token
  if (refreshExpired) {
    jwt.makeNewToken(res, user, "refresh", "30d");
  }

  // New Accesstoken
  jwt.makeNewToken(res, user, "access", "5s");
  req.user = user;
  next();
};
