// TODO: generalize these

function checkFieldsComment(req, res, next) {
  // TODO: check that the avatar is valid
  const { author, content, avatar } = req.body;
  if (author && content && avatar) {
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

// TODO: add a cooldown for users and some other anti spam measures

module.exports = {
  checkFieldsComment,
  checkFieldsOAuth,
  checkFieldsGithubUserData,
};
