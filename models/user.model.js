const helper = require("../helpers/helper.js");
const users = require("../data/users.json");

function insertNewUser({ uuid }) {
  return new Promise(async (resolve) => {
    users[uuid] = 1;
    helper.writeJSONFile("./data/users.json", users);
    resolve(uuid);
  });
}

function addVisit({ uuid }) {
  console.log(uuid);
  return new Promise(async (resolve) => {
    users[uuid]++;
    helper.writeJSONFile("./data/users.json", users);
    resolve(users[uuid]);
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

module.exports = {
  insertNewUser,
  addVisit,
  getUsers,
};
