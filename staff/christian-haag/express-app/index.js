const express = require('express')
const bodyParser = require('body-parser')

const { Html, Header, DuckResults, DuckDetail, Register, Login, RegisterSuccess, Favorites } = require('./components')
const session = require('express-session')
const logic = require('./logic')

const { argv: [, , port] } = process
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()


const {
    HOME,
    SEARCH,
    LOGIN,
    REGISTER,
    LOGOUT,
    FAVORITES,
    DETAIL,
    TOGGLE_FAV,
    SELECT_LANG
} = require('./paths')

app.use(express.static('public'))

app.use(session({
    secret: 'my secret phrase',
    resave: false,
    saveUninitialized: true,
}))

app.use((req, res, next) => {
    const { session } = req

    session.lang || (session.lang = 'en')

    next()
})


app.get(HOME, (req, res) => {
    const { session: { userId, token, query, lang } } = req

    req.session.view = HOME
    delete session.handleError

    delete session.name
    delete session.surname
    delete session.username
    delete session.password


    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Html(Header(user.name, query, lang))))
                .catch(error => { throw error })
        else
            res.send(Html(Header(undefined, query, lang)))
    } catch (error) {
        throw error
    }
})

app.get(SEARCH, (req, res) => {
    const { query: { q: query }, session: { userId, token, lang } } = req

    req.session.query = query
    req.session.view = `${SEARCH}/?q=${query}`

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, lang)}${DuckResults(ducks)}`)))

        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.post(TOGGLE_FAV, urlencodedParser, (req, res) => {
    const { body: { duckId }, session: { userId, token, view } } = req
    try {
        if (userId && token)
            logic.toggleFavDuck(userId, token, duckId)
                .then(() => res.redirect(view))
                .catch(error => { throw error })
        else
            res.redirect(LOGIN)
    } catch (error) {
        throw error
    }
})

app.get(FAVORITES, (req, res) => {
    const { session: { userId, token, query, lang } } = req

    req.session.view = FAVORITES

    if (userId && token)
        Promise.all([
            logic.retrieveUser(userId, token),
            logic.retrieveFavDucks(userId, token),
        ])
            .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, lang)}${Favorites(lang, ducks, `${SEARCH}/?q=${query}`)}`)))
            .catch(error => { throw error })

})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query, lang } } = req

    req.session.view = `${DETAIL}/${duckId}`

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, lang)}${DuckDetail(duck, lang, `${SEARCH}/?q=${query}`)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, lang)}${DuckDetail(duck, lang, `${SEARCH}/?q=${query}`)}`)
                ))
                .catch(error => { throw error })
    } catch (error) {
        throw error
    }

})

app.get(REGISTER, (req, res) => {
    const { session } = req

    req.session.view = REGISTER
    const { name, surname, username, lang, handleError } = session

    res.send(Html(Register(name, surname, username, lang, handleError, HOME)))

    delete session.name
    delete session.surname
    delete session.username

})

app.post(REGISTER, urlencodedParser, (req, res) => {
    const { session } = req
    const { body: { name, surname, username, password, repassword }, session: { lang } } = req

    session.name = name
    session.surname = surname
    session.username = username


    try {
        logic.registerUser(session.name, session.surname, session.username, password, repassword)
            .then(() => {
                delete session.handleError
                delete session.name
                delete session.surname
                delete session.username

            })
            .then(() => res.send(Html(RegisterSuccess(lang, LOGIN))))
            .catch((error) => {
                req.session.handleError = error.message
                res.redirect(REGISTER)
            })

    } catch (error) {
        req.session.handleError = error.message
        res.redirect(REGISTER)
    }
})


app.get(LOGIN, (req, res) => {
    const { session } = req
    req.session.view = LOGIN

    res.send(Html(Login(session, HOME)))
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
    } catch (error) {
        req.session.handleError = error.message
        res.redirect(LOGIN)
    }
})


app.post(LOGOUT, (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect(HOME)

})

app.post(SELECT_LANG, urlencodedParser, (req, res) => {
    const { body: { lang }, session: { view } } = req
    req.session.lang = lang
    res.redirect(view)

})



app.listen(port)