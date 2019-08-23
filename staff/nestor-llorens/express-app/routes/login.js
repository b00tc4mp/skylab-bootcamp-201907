const express = require('express')
const router = express.Router()

const { Html, Login } = require('../components')
const logic = require('../logic')

router.get('/', (req, res) => {

    if (req.session.view === undefined) req.session.view = '/'

    res.send(Html(Login(req.session.view)))
})

router.post('/', (req, res) => {

    logic.authenticateUser(req.body.email, req.body.password)
        .then(({ id, token }) => {
            
            req.session.userId = id
            req.session.token = token
            
        })
        .then(() => res.redirect(req.session.view))

})

module.exports = router