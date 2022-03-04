const helper = require("../helpers/helper.js");
const users = require("../data/users.json");

function insertNewUser({ uuid }) {
  return new Promise(async (resolve) => {
    users[uuid] = 1;
    helper.writeJSONFile("./data/users.json", users);
    resolve(uuid);
  });
}

module.exports = {
  insertNewUser,
};
