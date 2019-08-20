const express = require('express')
const { Html, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login, feedback } = require('./components')
const session = require('express-session')
const logic = require('./logic')
const literals = require('./constants')
const bodyParser = require('body-parser')

const formBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

const {
    HOME,
    SEARCH,
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    DETAIL,
    TOGGLE_FAV,
    FAVORITE
} = require('./constants')

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.get(HOME, (req, res) => {
    const { query: { lang }, session: { userId, token, query } } = req
    

    req.session.error = false
    // TODO make app multi-lang
    
    lang ? req.session.lang = lang : req.session.lang = "en"

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Html(Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE,req.session.lang))))
                .catch(error => { throw error })
        else
            res.send(Html(Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE,req.session.lang)))
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
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE, req.session.lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE, req.session.lang)}${DuckResults(ducks)}`)))
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
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE, req.session.lang)}${DuckDetail(duck)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE, req.session.lang)}${DuckDetail(duck)}`)))
    } catch (error) {
        throw error
    }
})

app.get(FAVORITE, (req, res) => {
    const { query: { q: query }, session: { userId, token } } = req
    req.session.view = 'favorite'
    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveFavDucks(userId, token)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT, FAVORITE, req.session.lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else res.redirect(SIGN_IN)
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session: { lang = 'en', error } } = req
    res.send(Html(Register(lang, error)))
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body } = req
    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(SIGN_IN))))
            .catch(error => {
                req.session.error = error.message
                res.redirect(SIGN_UP)
            })
    } catch (error) {
        req.session.error = error.message
        res.redirect(SIGN_UP)
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session } = req
    session.view = SIGN_IN
    const { lang } = session
    const{error}=session
    res.send(Html(Login(lang, error)))
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
            .catch(error => {
                req.session.error=error.message
                res.redirect(SIGN_IN)
             })
    } catch (error) {
        req.session.error=error.message
        res.redirect(SIGN_IN)
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
                .then(() => {
                    if (view === 'search') {
                        res.redirect(`${SEARCH}/?q=${query}`)
                    } else if (view === 'favorite') {
                        res.redirect(`${FAVORITE}/?q=${query}`)
                    } else {
                        res.redirect(`${DETAIL}/${id}`)
                    }
                })
                .catch(error => { throw error })
        } catch (error) {
            throw error
        }
    else res.redirect(SIGN_IN)
})

app.listen(port)