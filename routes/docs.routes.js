const express = require("express");
const router = express.Router();
const path = require('path');

/* Returns the homepage of the API documentation */
router.get("/", async(_req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

module.exports = router