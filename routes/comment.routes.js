const express = require('express')
const router = express.Router()
const comment = require('../models/comment.model')
const m = require('../helpers/middlewares')

/* All Comments */
router.get('/', async (_req, res) => {
    await comment.getComments()
        .then(comments => res.json(comments))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({
                    message: err.message
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
})

/* Insert a new comment */
router.post('/', m.checkFieldsComment, async (req, res) => {
    await comment.insertComment(req.body)
        .then(comment => res.status(201).json({
            message: `The comment has been succesfully created`,
            content: comment
        }))
        .catch(err => res.status(500).json({
            message: err.message
        }))
})

module.exports = router