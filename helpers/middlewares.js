// TODO: generalize these

const axios = require('axios');

function checkFieldsComment(req, res, next) {
  // TODO: check that the avatar is valid
  const {
    author,
    content,
    avatar,
    token
  } = req.body;
  if (author && content && avatar && token) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkFieldsOAuth(req, res, next) {
  const {
    code
  } = req.body;
  if (code) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkFieldsGithubUserData(req, res, next) {
  const {
    token
  } = req.body;
  if (token) {
    next();
  } else {
    res.status(400).json({
      message: "fields are not good",
    });
  }
}

function checkGitHubAuth(req, res, next) {
  const url = `${process.env.BASE_OAUTH_VALIDATION_URL}/${process.env.CLIENT_ID}/token`;
  axios.post(
    url, {
      "access_token": req.body.token
    }, {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET
      }
    }
  ).then(() => {
    next()
  }).catch(() => {
    res.status(400).json({
      message: "invalid oauth token",
    });
  })
}

// TODO: add a cooldown for users and some other anti spam measures

module.exports = {
  checkFieldsComment,
  checkFieldsOAuth,
  checkFieldsGithubUserData,
  checkGitHubAuth
};