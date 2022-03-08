const helper = require("../helpers/helper");
const users = require("../data/users.json");
const fs = require("fs");

function checkFields(req, res, next, keys, query = false) {
  let obj
  if (query) obj = req.query;
  else obj = req.body;

  let keysPresent = true
  keys.forEach(key => {
    if (!obj[key]) {
      res.status(400).json({
        message: "fields are not good"
      })
      keysPresent = false
    }
  })

  if (keysPresent) next()
}

async function checkGitHubAuth(req, res, next) {
  await helper
    .validateAuthor(req.body.token)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(400).json({
        message: "invalid oauth token",
      });
    });
}

function checkUserTimeout(req, res, next) {
  fs.readFile("data/comment-timestamps.json", (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }

    const commentTimestamps = JSON.parse(data);
    const currentTime = new Date().getTime();
    const lastCommentTime = commentTimestamps[req.body.token];

    if (currentTime - lastCommentTime > 10000 || !lastCommentTime) {
      next();
    } else {
      res.status(400).json({
        message: "user is on cooldown",
      });
    }
  });
}

function checkCommentLength(req, res, next) {
  console.log('comment length')
  if (req.body.content.length > 300) {
    res.status(400).json({
      message: "comment is too long",
    });
  } else {
    next();
  }
}

function checkFieldsAnalytics(req, res, next) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (regexExp.test(req.body.uuid)) {
    next();
  } else {
    res.status(400).json({
      message: "invalid uuid format",
    });
  }
}

function checkFieldsNewUser(req, res, next) {
  const uuid = req.body.uuid;
  if (!users[uuid]) {
    next();
  } else {
    res.status(400).json({
      message: "uuid already exists",
    });
  }
}

function checkFieldsAddVisit(req, res, next) {
  const uuid = req.body.uuid;
  if (users[uuid]) {
    next();
  } else {
    res.status(400).json({
      message: "uuid does not exist",
    });
  }
}

module.exports = {
  checkGitHubAuth,
  checkUserTimeout,
  checkCommentLength,
  checkFieldsAnalytics,
  checkFieldsNewUser,
  checkFieldsAddVisit,
  checkFields
};