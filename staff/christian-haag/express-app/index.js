const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')


const { Html, Header, DuckResults, DuckDetail, Register, Login, RegisterSuccess, FavDucks } = require('./components')
const session = require('express-session')
//const FileStore = require('session-file-store')(session)
const logic = require('./logic')
const { argv: [, , port] } = process
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()

const SEARCH = '/search', LOGIN = '/login', REGISTER = '/register', LOGOUT = '/logout', FAV = '/favorites', DETAIL = '/ducks'

app.use(session({
    secret: 'my secret phrase',
    resave: false,
    saveUninitialized: true,
}))


app.get('/', (req, res) => {
    const { session: { userId, token, query } } = req

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Html(Header(user.name, query, SEARCH, LOGIN, REGISTER, FAV, LOGOUT))))
                .catch(error => { throw error })
        else
            res.send(Html(Header(undefined, query, SEARCH, LOGIN, REGISTER, LOGOUT)))
    } catch (error) {
        throw error
    }
})

app.get('/search', (req, res) => {
    const { query: { q: query }, session: { userId, token } } = req

    req.session.query = query
    req.session.view = 'search'

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, LOGIN, REGISTER, FAV, LOGOUT)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, SEARCH, LOGIN, REGISTER, FAV, LOGOUT)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.post('/ontoggle', urlencodedParser, (req, res) => {
    const { body: { duckId }, session: { userId, token, query, view } } = req
    console.log('data ', userId, token)
    if (userId && token)
        logic.toggleFavDuck(userId, token, duckId)
            .then(() => {
                view === 'search' ? res.redirect(`${SEARCH}/?q=${query}`) : res.redirect(`${SEARCH}/:${duckId}`)
            })
            .catch(error => { throw error })
    else
        res.redirect(LOGIN)
})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req


    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, SEARCH, LOGIN, REGISTER, LOGOUT)}${DuckDetail(duck, user)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, SEARCH, LOGIN, REGISTER, LOGOUT)}${DuckDetail(duck)}`)
                ))
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

                res.redirect('/')
            })
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/logout', (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect('/')

})

app.get('/favorites', (req, res) => {
    res.send(FavDucks())
})

app.listen(port)