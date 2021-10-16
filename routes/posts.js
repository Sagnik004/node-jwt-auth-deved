const router = require("express").Router();
const { verifyToken } = require("./verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.json({
    userData: req.user,
  });
});

module.exports = router;
