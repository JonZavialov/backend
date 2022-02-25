function checkFieldsComment(req, res, next) {
    const {
        author,
        content
    } = req.body
    if (author && content) {
        next()
    } else {
        res.status(400).json({
            message: 'fields are not good'
        })
    }
}

// TODO: add a cooldown for users and some other anti spam measures

module.exports = {
    checkFieldsComment
}