const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/protected", authenticateToken, (req, res) => {
  return res.status(200).json({ user: req.user.name });
});

module.exports = router;
