function checkFieldsPost(req, res, next) {
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

module.exports = {
    checkFieldsPost
}