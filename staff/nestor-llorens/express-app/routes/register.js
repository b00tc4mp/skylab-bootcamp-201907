const express = require('express')
const router = express.Router()

const { Html, Register } = require('../components')
const logic = require('../logic')

router.get('/', (req, res) => {
    
    if (req.session.view === undefined) req.session.view = '/'
    
    res.send(Html(Register(req.session.view)))
})

router.post('/', (req, res) => {

    const { body } = req

    const { name, surname, email, password, repassword } = body

    logic.registerUser(name, surname, email, password, repassword)
        .then(() => res.redirect('/login'))
})

module.exports = router