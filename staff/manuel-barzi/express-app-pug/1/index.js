const express = require('express')
const { Page, Home, DuckDetail, Register, RegisterSuccess, Login } = require('./components')
const session = require('express-session')
const logic = require('./logic')
const bodyParser = require('body-parser')
const {
    HOME,
    SEARCH,
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    DETAIL,
    TOGGLE_FAV,
    SELECT_LANG
} = require('./paths')

const formBodyParser = bodyParser.urlencoded({ extended: true })

const { argv: [, , port] } = process

const app = express()

app.set('view engine', 'pug')
app.set('views', 'components');

app.use(express.static('public'))

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.use((req, res, next) => {
    const { session } = req

    session.lang || (session.lang = 'en')

    next()
})

app.get(HOME, (req, res) => {
    const { session } = req

    session.view = HOME

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user =>
                    // res.send(Html(Home(user.name, query, lang)))
                    Home(user.name, query, lang, undefined, res)
                )
                .catch(error => { throw error })
        else
            // res.send(Html(Home(undefined, query, lang)))
            Home(undefined, query, lang, undefined, res)
    } catch (error) {
        throw error
    }

})

app.get(SEARCH, (req, res) => {
    const { query: { q: query }, session } = req

    session.query = query
    session.view = `${SEARCH}?q=${query}`

    const { userId, token, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) =>
                    //res.send(Html(`${Home(user.name, query, lang)}${DuckResults(ducks)}`))
                    Home(user.name, query, lang, ducks, res)
                )
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks =>
                    // res.send(Html(`${Home(undefined, query, lang)}${DuckResults(ducks)}`))
                    Home(undefined, query, lang, ducks, res)
                )
    } catch (error) {
        throw error
    }
})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session } = req

    session.view = `${DETAIL}/${duckId}`

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Page(`${Home(user.name, query, lang)}${DuckDetail(duck)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Page(`${Home(undefined, query, lang)}${DuckDetail(duck)}`)))
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session } = req

    session.view = SIGN_UP

    const { error, name, surname, email, lang } = session

    delete session.error
    delete session.name
    delete session.surname
    delete session.email

    Register(error, name, surname, email, lang, res)
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body, session } = req

    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Page(RegisterSuccess(lang))))
            .catch(({ message }) => {
                session.error = message
                session.name = name
                session.surname = surname
                session.email = email

                res.redirect(SIGN_UP)
            })
    } catch ({ message }) {
        session.error = message
        session.name = name
        session.surname = surname
        session.email = email

        res.redirect(SIGN_UP)
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session } = req

    session.view = SIGN_IN

    const { error, email, lang } = session

    delete session.error
    delete session.email

    Login(error, email, lang, res)
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
            .catch(({ message }) => {
                session.error = message
                session.email = email

                res.redirect(SIGN_IN)
            })
    } catch ({ message }) {
        session.error = message
        session.email = email

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
                .then(() => res.redirect(view))
                .catch(error => { throw error })
        } catch (error) {
            throw error
        }
    else res.redirect(SIGN_IN)
})

app.post(SELECT_LANG, formBodyParser, (req, res) => {
    const { body: { lang }, session } = req

    session.lang = lang

    const { view } = session

    res.redirect(view)
})

app.listen(port)