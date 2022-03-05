// TODO: generalize these

const helper = require("../helpers/helper");
const users = require("../data/users.json");
const fs = require("fs");

function checkFieldsComment(req, res, next) {
  const { content, token } = req.body;
  if (content && token) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkFieldsOAuth(req, res, next) {
  const { code } = req.body;
  if (code) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkFieldsGithubUserData(req, res, next) {
  const { token } = req.query;
  if (token) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
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
  if (req.body.content.length > 300) {
    res.status(400).json({
      message: "comment is too long",
    });
  } else {
    next();
  }
}

function checkFieldsNationalDays(req, res, next) {
  const { month, day } = req.query;
  if (month && day) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkFieldsAnalytics(req, res, next) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  const { uuid } = req.body;
  if (uuid && regexExp.test(uuid)) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
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
  checkFieldsComment,
  checkFieldsOAuth,
  checkFieldsGithubUserData,
  checkGitHubAuth,
  checkUserTimeout,
  checkCommentLength,
  checkFieldsNationalDays,
  checkFieldsAnalytics,
  checkFieldsNewUser,
  checkFieldsAddVisit,
};
