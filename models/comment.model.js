let comments = require("../data/comments.json");
let timestamps = require("../data/comment-timestamps.json");
const helper = require("../helpers/helper.js");
const fs = require("fs");

function getComments() {
  return new Promise((resolve, reject) => {
    if (comments.length === 0) {
      reject({
        message: "no comments available",
        status: 202,
      });
    }
    resolve(comments);
  });
}

function insertComment(content, token) {
  return new Promise(async (resolve) => {
    const date = {
      createdAt: helper.newDate(),
    };
    const authorData = await helper.validateAuthor(token);
    const newComment = {
      content,
      ...date,
      ...authorData,
    };
    writeTimestamps(token, date);
    comments.push(newComment);
    helper.writeJSONFile("./data/comments.json", comments);
    resolve(newComment);
  });
}

function writeTimestamps(token, date) {
  timestamps[token] = date.createdAt;
  helper.writeJSONFile("./data/comment-timestamps.json", timestamps);
}

module.exports = {
  insertComment,
  getComments,
};