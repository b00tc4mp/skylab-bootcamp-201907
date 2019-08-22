const express = require('express')
const { Html, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login , Feedback} = require('./components')
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

    req.session.error = false

    session.view = HOME

    const { userId, token, query, lang } = session

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
    const { query: { q: query }, session } = req
   
    
    req.session.query = query
    req.session.view = `${SEARCH}?q=${query}`

    
    const { userId, token, lang } = session
 

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, lang)}${DuckResults(ducks)}`)))
                .catch(error => { 
                    
                 })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, lang)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})


app.get(`${DETAIL}/:id`, (req, res) => {
    const {  params: { id: duckId }, session } = req
   
    
    session.view = `${DETAIL}/${duckId}`
    
    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, lang)}${DuckDetail(duck, lang, query)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, lang)}${DuckDetail(duck,lang,query)}`)))
    } catch (error) {
        throw error
    }
})
 


app.get(SIGN_UP, (req, res) => {
    const { session } = req

    session.view = SIGN_UP

    const { lang } = session
    const { error } = session
     
    res.send(Html(Register(lang, error)))
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body, session: { lang } } = req

    const { name, surname, email, password, repassword } = body
    req.session.error = false

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(lang))))
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

    const { lang , error } = session

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
                req.session.error = error.message
                res.redirect(SIGN_IN)
             })
    } catch (error) {
        req.session.error = error.message
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

app.get(FAVORITE, (req, res) => {
    const { session } = req

    session.view = `${FAVORITE}?q=${''}`


    const { userId, token, lang, duckId, query} = session
    session.query=''

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveFavDucks(userId, token, duckId)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, undefined, lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveFavDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, undefined, lang)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})



app.listen(port)