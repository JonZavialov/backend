const filename = '../data/posts.json'
let posts = require(filename)
const helper = require('../helpers/helper.js')

function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(posts)
    })
}

function insertPost(newPost) {
    return new Promise((resolve) => {
        const id = {
            id: helper.getNewId(posts)
        }
        const date = {
            createdAt: helper.newDate(),
        }
        newPost = {
            ...id,
            ...date,
            ...newPost
        }
        posts.push(newPost)
        helper.writeJSONFile("./data/posts.json", posts)
        resolve(newPost)
    })
}

module.exports = {
    insertPost,
    getPosts
}