let comments = require('../data/comments.json')
const helper = require('../helpers/helper.js')

function getComments() {
    return new Promise((resolve, reject) => {
        if (comments.length === 0) {
            reject({
                message: 'no comments available',
                status: 202
            })
        }
        resolve(comments)
    })
}

function insertComment(newComment) {
    return new Promise((resolve) => {
        const date = {
            createdAt: helper.newDate(),
        }
        newComment = {
            ...date,
            ...newComment
        }
        comments.push(newComment)
        helper.writeJSONFile("./data/comments.json", comments)
        resolve(newComment)
    })
}

module.exports = {
    insertComment,
    getComments
}