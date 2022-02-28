let comments = require("../data/comments.json");
const helper = require("../helpers/helper.js");

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
    const authorData = await helper.getAuthorData(token)
    const newComment = {
      content,
      ...date,
      ...authorData
    };
    comments.push(newComment);
    helper.writeJSONFile("./data/comments.json", comments);
    resolve(newComment);
  });
}

module.exports = {
  insertComment,
  getComments,
};