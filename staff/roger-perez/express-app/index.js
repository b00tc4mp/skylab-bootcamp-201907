// Requiring express, components and logic and passing them to named variables.
const express = require('express')
const { Page, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login } = require('./components')
const logic = require('./logic')

// Creating a session middleware[*] with given options (express-session accepts properties in the options object: cookie, cookie.domain, cookie.expires...).
// [*] Functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
const session = require('express-session')

/* 
To parse the data coming from POST requests, you have to install a package: the body-parser. This package allows you to use a series of middleware, which can decode data in different formats. The middleware to handle url encoded data is returned by bodyParser.urlencoded({extended: false}). extended=false is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
*/
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: true })

// Passing paths as constants (capital letters convention).
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

// port is the first command-line argument; this equals const port = process.argv[2] */
const { argv: [, , port] } = process

// app is an instance of express
const app = express()

// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function.
app.use(express.static('public'))

// Initializing the session. 
app.use(session({
    secret: 's3cr3t th1ng',
    // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
    saveUninitialized: true,
    // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: true
}))

app.use((req, res, next) => {
    const { session } = req

    session.lang || (session.lang = 'en')

    next()
})

/*Basic routing: app.METHOD(PATH, HANDLER)
- METHOD is a http request method.
- PATH is a path on the server.
- HANDLER is a function executed when the route is matched.
*/
// Home 
app.get(HOME, (req, res) => {
    const { session } = req

    session.view = HOME

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(Page(Header(user.name, query, lang))))
                .catch(error => { throw error })
        else
            res.send(Page(Header(undefined, query, lang)))
    } catch (error) {
        throw error
    }

})

// Search 
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
                .then(([user, ducks]) => res.send(Page(`${Header(user.name, query, lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Page(`${Header(undefined, query, lang)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})

// Duck detail 
app.get(`${DETAIL}/:id`, (req, res) => {
    const { params: { id: duckId }, session } = req

    const back = session.view
    session.view = `${DETAIL}/${duckId}`

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Page(`${Header(user.name, query, lang)}${DuckDetail(duck, lang, back)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Page(`${Header(undefined, query, lang)}${DuckDetail(duck, lang, back)}`)))
    } catch (error) {
        throw error
    }
})

// Register 
app.get(SIGN_UP, (req, res) => {
    const { session } = req

    const back = session.view
    session.view = SIGN_UP

    const { error, lang, name, surname, email } = session

    delete session.error
    delete session.name
    delete session.surname
    delete session.email

    res.send(Page(Register(error, name, surname, email, lang, back)))
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

// Login
app.get(SIGN_IN, (req, res) => {
    const { session } = req

    const back = session.view
    session.view = SIGN_IN

    const { error, email, lang } = session

    delete session.error
    delete session.email

    res.send(Page(Login(error, email, lang, back)))
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

// Logout
app.post(SIGN_OUT, (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect(HOME)
})

// Favorites
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

app.get(FAVORITE, (req, res) => {
    const { query: { q: query }, session } = req

    session.query = query
    session.view = `${FAVORITE}?q=${""}`

    const { userId, token, lang, duckId } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveFavDucks(userId, token, duckId)
            ])
                .then(([user, ducks]) => res.send(Page(`${Header(user.name, query, lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveFavDucks(undefined, undefined, query)
                .then(ducks => res.send(Page(`${Header(undefined, query, lang)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})

// Language
app.post(SELECT_LANG, formBodyParser, (req, res) => {
    const { body: { lang }, session } = req

    session.lang = lang

    const { view } = session

    res.redirect(view)
})

// Binding and listening for connections on the specified host and port.
app.listen(port)