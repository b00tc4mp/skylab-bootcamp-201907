const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./logic')

const formBodyParser = bodyParser.urlencoded({ extended: true })

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/search', (req, res) => {
    const items = ['zanahoria', 'patata', 'pepino', 'calabacin', 'tomate']

    res.render('results', { items })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    const { token, id } = logic.authenticateUser(email, password)

    res.redirect(`/user/${id}/${token}`)
})

app.get('/user/:id/:token', (req, res) => {
    res.render('user')
})

app.listen(8080)