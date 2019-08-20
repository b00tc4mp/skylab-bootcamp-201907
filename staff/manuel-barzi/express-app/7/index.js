const express = require('express')
const { Html, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login } = require('./components')
const session = require('express-session')
const logic = require('./logic')
const literals = require('./literals')
const bodyParser = require('body-parser')

const formBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port] } = process

const app = express()

const HOME = '/', SEARCH = '/search', SIGN_IN = '/sign-in', SIGN_UP = '/sign-up', SIGN_OUT = '/sign-out', DETAIL = '/ducks', TOGGLE_FAV = '/toggle-favorite'

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.get(HOME, (req, res) => {
    const { session: { userId, token, query } } = req

    // TODO make app multi-lang
    req.session.lang = 'fr'

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Html(Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT))))
                .catch(error => { throw error })
        else
            res.send(Html(Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)))
    } catch (error) {
        throw error
    }

})

app.get(SEARCH, (req, res) => {
    const { query: { q: query }, session: { userId, token } } = req

    req.session.query = query
    req.session.view = 'search'

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req

    req.session.view = 'detail'

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session: { lang = 'en' } } = req

    res.send(Html(Register(literals[lang].signUp, SIGN_UP)))
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body } = req

    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(SIGN_IN))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session: { lang = 'en' } } = req

    res.send(Html(Login(literals[lang].signIn, SIGN_IN)))
})

app.post(SIGN_IN, formBodyParser, (req, res) => {
    const { body, session } = req

    const { email, password } = body

    try {
        logic.authenticateUser(email, password)
            .then(({ id, token }) => {
                session.userId = id
                session.token = token

                res.redirect(HOME)
            })
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.post(SIGN_OUT, (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect(HOME)
})

app.post(TOGGLE_FAV, formBodyParser, (req, res) => {
    const { body: { id }, session: { userId, token, query, view } } = req

    if (userId && token)
        try {
            logic.toggleFavDuck(userId, token, id)
                .then(() => view === 'search' ? res.redirect(`${SEARCH}/?q=${query}`) : res.redirect(`${DETAIL}/${id}`))
                .catch(error => { throw error })
        } catch (error) {
            throw error
        }
    else res.redirect(SIGN_IN)
})

app.listen(port)