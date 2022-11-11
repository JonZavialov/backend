const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const m = require("../helpers/middlewares");

/* Gets national day information from a date */
router.get("/", (req, res, next) => m.checkFields(req, res, next, ['month', 'day'], true), async (req, res) => {  
  await helper
    .getNationalDays(req.query)
    .then((data) => {
      helper.formatDates(data, req.query)
      .then((formatted) => {
        res.status(200).json(formatted);
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
});

module.exports = router;