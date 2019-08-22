const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    delete req.session.userId
    delete req.session.token
    delete req.session.view

    res.redirect('/')
})

module.exports = router