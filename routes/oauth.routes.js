const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets access token from client secret */
router.post("/", m.checkFieldsOAuth, async (req, res) => {
  await helper
    .authorizeClient(req.body, process.env.CLIENT_SECRET, process.env.CLIENT_ID)
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
