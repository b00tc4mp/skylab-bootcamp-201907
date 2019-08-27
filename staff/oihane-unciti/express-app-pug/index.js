const express = require('express')
const { Html, Home, DuckDetail, Register, RegisterSuccess, Login } = require('./components')
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
    SELECT_LANG,
    FAVORITE
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
    req.session.error=false

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user =>
            
                    Home(user.name, query, lang, undefined, undefined, res)
                )
                .catch(error => { throw error })
        else
           
            Home(undefined, query, lang, undefined, undefined, res)
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
                    
                    Home(user.name, query, lang, ducks, undefined, res)
                )
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks =>
                    
                    Home(undefined, query, lang, ducks, undefined, res)
                )
    } catch (error) {
        throw error
    }
})

app.get(FAVORITE, (req, res) => {
    const { query: { q: query }, session } = req

    session.query = query
    session.view = `${FAVORITE}`

    const { userId, token, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveFavDucks(userId, token, query)
            ])
                .then(([user, ducks]) =>
                    
                    Home(user.name, query, lang, ducks, undefined, res)
                )
                .catch(error => { throw error })
        else
            logic.retrieveFavDucks(undefined, undefined, query)
                .then(ducks =>
                   
                    Home(undefined, query, lang, ducks, undefined, res)
                )
    } catch (error) {
        throw error
    }
})

app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session } = req

    session.view = `/ducks/${duckId}`

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
               
                .then(([user, duck]) => Home(user.name, query, lang, undefined, duck, res))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
            
                .then(duck => Home(undefined, query, lang, undefined, duck, res))
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session } = req

    session.view = SIGN_UP

    const { error } = session

    const { lang } = session
    Register(lang, res, error)
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body, session: { lang } } = req

    const { name, surname, email, password, repassword } = body



    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() =>RegisterSuccess(lang,res))
            .catch(error => { 
                req.session.error=error.message
                res.redirect(SIGN_UP)
            })
    } catch (error) {
        req.session.error=error.message
        res.redirect(SIGN_UP) // PQ ES redirect() i no send() ????
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session } = req

    session.view = SIGN_IN

    const{ error }=session

    const { lang } = session

    Login(lang, res, error)
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