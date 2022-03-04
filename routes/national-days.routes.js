const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets national day information from a date */
router.get("/", m.checkFieldsNationalDays, async (req, res) => {
  await helper
    .getNationalDays(req.query)
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
