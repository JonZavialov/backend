const express = require("express");
const router = express.Router();
module.exports = router;
router.use("/api/v1/comments", require("./comment.routes"));
router.use("/api/v1/oauth", require("./oauth.routes"));
router.use("/api/v1/github", require("./github.routes"));
