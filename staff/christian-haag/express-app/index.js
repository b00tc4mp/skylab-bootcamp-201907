const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')


const { Html, Header, Search, DuckResults, DuckDetail, Register, Login, Home, RegisterSuccess } = require('./components')
const session = require('express-session')
//const FileStore = require('session-file-store')(session)
const logic = require('./logic')
const { argv: [, , port] } = process
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()

app.use(session({
    secret: 'my secret phrase',
    resave: false,
    saveUninitialized: true,
}))


app.get('/', (req, res) => {
    res.send(Html(Search()))
})

app.get('/search', (req, res) => {
    const { query: { q }, session: { userId, token } } = req

    session.query = q

    try {
        logic.searchDucks(userId, token, q)
            .then(ducks => res.send(Html(`${Search(q)}${DuckResults(ducks)}`)))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.get('/ducks/:id', (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req
    try {
        logic.retrieveDuck(userId, token, duckId)
            .then(duck => res.send(`${Search(query)}${DuckDetail(duck)}`))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.get('/register', (req, res) => {
    res.send(Html(Register('/register')))
})

app.post('/register', urlencodedParser, (req, res) => {
    const { body } = req
    const { name, surname, username, password, repassword } = body

    try {
        logic.registerUser(name, surname, username, password, repassword)
            .then(() => res.send(Html(RegisterSuccess('/login'))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})


app.get('/login', (req, res) => {
    res.send(Html(Login('/login')))
})

app.post('/login', urlencodedParser, (req, res) => {
    const { body, session } = req

    const { username, password } = body

    try {
        logic.authenticateUser(username, password)
            .then(({ id, token }) => {
                session.userId = id
                session.token = token

                res.redirect('/home')
            })
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/home', (req, res) => {
    const { session: { userId, token } } = req

    try {
        logic.retrieveUser(userId, token)
            .then(({ name }) => {
                res.send(Html(Home(Header(name), '/favorites', '/logout', Search())))
            })
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})


app.listen(port)