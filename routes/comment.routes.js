const express = require("express");
const router = express.Router();
const comment = require("../models/comment.model");
const m = require("../helpers/middlewares");

/* Gets All Comments */
router.get("/", async (_req, res) => {
  await comment
    .getComments()
    .then((comments) => res.json(comments))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
        });
      } else {
        res.status(500).json({
          message: err.message,
        });
      }
    });
});

/* Insert a new comment */
router.post(
  "/",
  (req, res, next) => m.checkFields(req, res, next, ["content", "token"]),
  m.checkCommentLength,
  m.checkGitHubAuth,
  m.checkUserTimeout,
  async (req, res) => {
    await comment
      .insertComment(req.body.content, req.body.token)
      .then((comment) =>
        res.status(201).json({
          message: `The comment has been successfully created`,
          content: comment,
        })
      )
      .catch((err) =>
        res.status(500).json({
          message: err.message,
        })
      );
  }
);

module.exports = router;
