const express = require("express");
const router = express.Router();
module.exports = router;
router.use("/v1/comments", require("./comment.routes"));
router.use("/v1/oauth", require("./oauth.routes"));
router.use("/v1/github", require("./github.routes"));
router.use("/v1/national-days", require("./national-days.routes"));