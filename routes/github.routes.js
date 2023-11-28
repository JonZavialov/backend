const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets public user information from token */
router.get("/getUserData", (req, res, next) => m.checkFields(req, res, next, ['token'], true), async (req, res) => {
  // TODO: change this to kebab case
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

router.get("/repoContents", (req, res, next) => m.checkFields(req, res, next, ['repo', 'path'], true), async (req, res) => {
  await helper
    .getRepoContents(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(500).json({
        err
      })
    );
})

module.exports = router;
