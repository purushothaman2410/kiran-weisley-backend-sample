const express = require("express");
const router = express.Router();

// Dummy endpoint for now
router.get("/", (req, res) => {
  res.json({ message: "Gallery route is not yet implemented." });
});

module.exports = router;
