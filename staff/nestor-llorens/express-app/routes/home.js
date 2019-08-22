const express = require('express')
const router = express.Router()

const logic = require('../logic')
const { Html, Header } = require('../components')

router.get('/', (req, res) => {

    req.session.query = req.query.q

    if (req.session.userId && req.session.token)
        logic.retrieveUser(req.session.userId, req.session.token)
        .then(user => res.send(Html(Header(req.session.query, user.name))))

    else res.send(Html(Header(req.session.query, undefined)))
})

module.exports = router