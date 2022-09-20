const helper = require("../helpers/helper.js");
const users = require("../data/users.json");
let lastUniqueUser = 'No date available';

function insertNewUser({ uuid }) {
  lastUniqueUser = Date();
  
  return new Promise(async (resolve) => {
    users[uuid] = 1;
    helper.writeJSONFile("./data/users.json", users);
    resolve(uuid);
  });
}

function addVisit({ uuid }) {
  return new Promise(async (resolve) => {
    users[uuid]++;
    helper.writeJSONFile("./data/users.json", users);
    resolve(users[uuid]);
  });
}

function getUsers() {
  return new Promise((resolve) => {
    resolve(users);
  });
}

function getInfo() {
  return new Promise((resolve) => {
    let uniqueUsers = Object.keys(users).length;
    let totalVisits = 0

    Object.keys(users).forEach(user => {
      totalVisits += users[user]
    });

    resolve({
      uniqueUsers,
      totalVisits,
      lastUniqueUser
    });
  });
}

module.exports = {
  insertNewUser,
  addVisit,
  getUsers,
  getInfo
};
