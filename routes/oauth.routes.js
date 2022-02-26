const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets access token from client secret */
router.post("/", m.checkFieldsOAuth, async (req, res) => {
  await helper
    .authorizeClient(req.body, process.env.CLIENT_SECRET, process.env.CLIENT_ID)
    .then((accessToken) => {
      res.status(200).json({
        accessToken,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
});

module.exports = router;
