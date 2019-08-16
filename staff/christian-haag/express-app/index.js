const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const { Html, Header, DuckResults, DuckDetail, Register, Login, RegisterSuccess, FavDucks } = require('./components')
const session = require('express-session')
const logic = require('./logic')
//const literals = require('./constants')
const { argv: [, , port] } = process
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const lang_code = 'de'

const {
    HOME,
    SEARCH,
    LOGIN,
    REGISTER,
    LOGOUT,
    FAV,
    DETAIL,
    TOGGLE_FAV
} = require('./constants')

app.use(session({
    secret: 'my secret phrase',
    resave: false,
    saveUninitialized: true,
}))


app.get(HOME, (req, res) => {
    const { session: { userId, token, query, lang = `${lang_code}` } } = req


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

app.get(SEARCH, (req, res) => {
    const { query: { q: query }, session: { userId, token, lang = `${lang_code}` } } = req

    req.session.query = query
    req.session.view = 'search'

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, LOGIN, REGISTER, LOGOUT)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, SEARCH, LOGIN, REGISTER, LOGOUT)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.post(TOGGLE_FAV, urlencodedParser, (req, res) => {
    const { body: { duckId }, session: { userId, token, query, view, lang = `${lang_code}` } } = req
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
    const { params: { id: duckId }, session: { userId, token, query, lang = `${lang_code}` } } = req


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

app.get(REGISTER, (req, res) => {
    const { session: { lang = `${lang_code}` } } = req
    res.send(Html(Register(lang)))
})

app.post(REGISTER, urlencodedParser, (req, res) => {
    const { body } = req
    const { name, surname, username, password, repassword } = body

    try {
        logic.registerUser(name, surname, username, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(LOGIN))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})


app.get(LOGIN, (req, res) => {
    const { session: { lang = `${lang_code}` } } = req
    res.send(Html(Login(lang)))
})

app.post(LOGIN, urlencodedParser, (req, res) => {
    const { body, session } = req

    const { username, password } = body

    try {
        logic.authenticateUser(username, password)
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

app.get(LOGOUT, (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect(HOME)

})

app.get('/favorites', (req, res) => {
    res.send(FavDucks())
})

app.listen(port)