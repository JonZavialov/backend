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
      .post(url)
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

module.exports = {
  newDate,
  writeJSONFile,
  authorizeClient,
};
