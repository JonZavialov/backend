const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const m = require("../helpers/middlewares");

/* Adds a new user to the database */
router.post(
  "/newuser",
  m.checkFieldsAnalytics,
  m.checkFieldsNewUser,
  async (req, res) => {
    await user
      .insertNewUser(req.body)
      .then((uuid) =>
        res.status(201).json({
          message: `The user has been successfully created`,
          uuid,
        })
      )
      .catch((err) =>
        res.status(500).json({
          message: err.message,
        })
      );
  }
);

/* Adds a visit to the user in the database */
router.post(
  "/addvisit",
  m.checkFieldsAnalytics,
  m.checkFieldsAddVisit,
  async (req, res) => {
    await user
      .addVisit(req.body)
      .then((visits) =>
        res.status(201).json({
          message: `The visit has been added`,
          visits,
        })
      )
      .catch((err) =>
        res.status(500).json({
          message: err.message,
        })
      );
  }
);

router.get("/", async (_req, res) => {
  await user
    .getUsers()
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
