const fs = require("fs");
const axios = require("axios");

const newDate = () => new Date().getTime();

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function authorizeClient(body, CLIENT_SECRET, CLIENT_ID) {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.BASE_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${body.code}`;

    axios
      .post(
        url,
        {},
        {
          headers: {
            "Accept": "application/json",
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject({
          message: "invalid code",
          status: 400,
        });
      });
  });
}

function getUserData(query) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(process.env.BASE_USER_URL, {
        headers: {
          "Authorization": `token ${query.token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject({
          message: "invalid token",
          status: 400,
        });
      });
  });
}

function validateAuthor(token) {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.BASE_OAUTH_VALIDATION_URL}/${process.env.CLIENT_ID}/token`;
    axios
      .post(
        url,
        {
          "access_token": token,
        },
        {
          auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET,
          },
        }
      )
      .then((res) => {
        resolve({
          author: res.data.user.login,
          avatar: res.data.user.avatar_url,
        });
      })
      .catch(() => {
        reject();
      });
  });
}

function getNationalDays(query) {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.BASE_DAYS_URL}/${query.month}/${query.day}`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject({
          message: "invalid date",
          status: 400,
        });
      });
  });
}

module.exports = {
  newDate,
  writeJSONFile,
  authorizeClient,
  getUserData,
  validateAuthor,
  getNationalDays,
};
