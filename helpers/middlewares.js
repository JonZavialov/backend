// TODO: generalize these

const helper = require("../helpers/helper");

function checkFieldsComment(req, res, next) {
  // TODO: check that the avatar is valid
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
  const { token } = req.body;
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
    .getAuthorData(req.body.token)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(400).json({
        message: "invalid oauth token",
      });
    });
}

// TODO: add a cooldown for users and some other anti spam measures

module.exports = {
  checkFieldsComment,
  checkFieldsOAuth,
  checkFieldsGithubUserData,
  checkGitHubAuth,
};
