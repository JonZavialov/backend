const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets access token from client secret */
router.post("/getUserData", m.checkFieldsGithubUserData, async (req, res) => {
  await helper
    .getUserData(req.body)
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
