const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets user information from token */
router.get("/getUserData", m.checkFieldsGithubUserData, async (req, res) => {
  await helper
    .getUserData(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
});

module.exports = router;