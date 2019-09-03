const express = require('express')
const { Html, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login, Home } = require('./components')
const session = require('express-session')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

const {
    HOME,
    SEARCH,
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    DETAIL,
    TOGGLE_FAV,
    LOCALE,
    FAVORITES
} = require('./constants')


app.use(express.static('public'))

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.use(express.urlencoded())

app.get(HOME, (req, res) => {
    const { session: { userId, token, query, lang = 'en' } } = req 

    req.session.view = HOME

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Html(`${Header(user.name, query, lang)}${Home(lang)}`)))
                .catch(error => { throw error })
        else
            res.send(Html(`${Header(undefined, query, lang)}${Home(lang)}`))
    } catch (error) {
        throw error
    }

})

app.get(SEARCH, (req, res) => {
    const { query: { q: query }, session: { userId, token, lang = 'en' } } = req

    req.session.query = query
    req.session.view = `${SEARCH}?q=${query}`

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, lang)}${DuckResults(ducks, 'search')}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, lang)}${DuckResults(ducks, 'search')}`)))
    } catch (error) {
        throw error
    }
})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query, lang = 'en', view } } = req

    req.session.view = `${DETAIL}/${duckId}`

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, lang)}${DuckDetail(duck, lang, query, view)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, lang)}${DuckDetail(duck, lang, query, view)}`)))
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session: { lang = 'en' } } = req

    req.session.view = SIGN_UP

    res.send(Html(Register(lang)))
})

app.post(SIGN_UP, (req, res) => {
    const { body, session: { lang = 'en' } } = req

    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(lang))))
            .catch(error => { res.send(Html(Register(lang, error))) })
    } catch (error) {
        res.send(Html(Register(lang, error)))
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session: { lang = 'en' } } = req

    req.session.view = SIGN_IN

    res.send(Html(Login(lang)))
})

app.post(SIGN_IN, (req, res) => {
    const { body, session: { lang = 'en' } } = req

    const { email, password } = body

    try {
        logic.authenticateUser(email, password)
            .then(({ id, token }) => {
                req.session.userId = id
                req.session.token = token

                res.redirect(HOME)
            })
            .catch(error => { res.send(Html(Login(lang, error))) })
    } catch (error) {
        res.send(Html(Login(lang, error)))
    }
})

app.post(SIGN_OUT, (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect(HOME)
})

app.post(TOGGLE_FAV, (req, res) => {
    const { body: { id }, session: { userId, token, query, view } } = req

    if (userId && token)
        try {
            logic.toggleFavDuck(userId, token, id)
                .then(() => {
                    if (view.includes('search')) res.redirect(`${SEARCH}/?q=${query}`)
                    else if  (view.includes('favorites')) res.redirect('/favorites') 
                    else res.redirect(`${DETAIL}/${id}`)
                })
                .catch(error => { throw error })
        } catch (error) {
            throw error
        }
    else res.redirect(SIGN_IN)
})


app.post(LOCALE, (req, res) => {
    const { body: {lang}, session: { view } } = req
    req.session.lang = lang
    res.redirect(view)
})


app.get(FAVORITES, (req, res) => {
    const { query: {q: query}, session: { userId, token, lang = 'en' } } = req

    req.session.view = 'favorites'

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveFavDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, undefined, lang)}${DuckResults(ducks, 'favorites')}`)))
                .catch(error => { throw error })
        else
            res.redirect(SIGN_IN)
    } catch (error) {
        throw error
    }
})


app.listen(port)