// Requiring express and components and passing them to named variables.
const express = require('express')
const { Html, Header, DuckResults, DuckDetail, Register, RegisterSuccess, Login } = require('./components')

// Creating a session middleware with given options (express-session accepts properties in the options object: cookie, cookie.domain, cookie.expires...).
const session = require('express-session')

/* 
To parse the data coming from POST requests, you have to install a package: the body-parser. This package allows you to use a series of middleware, which can decode data in different formats. The middleware to handle url encoded data is returned by bodyParser.urlencoded({extended: false}). extended=false is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays. We could use app.use(bodyParser.urlencoded({ extended: false })) but we'l use our own parser
*/
const { parseBody } = require('./utils')
const logic = require('./logic')
const literals = require('./literals')

// port is the first command-line argument; this equals const port = process.argv[2] */
const { argv: [, , port] } = process

// app is an instance of express
const app = express()

// Passing paths as constants (capital letters convention).
const SEARCH = '/search', SIGN_IN = '/sign-in', SIGN_UP = '/sign-up', SIGN_OUT = '/sign-out'

// Initializing the session. 
app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))


/*Basic routing: app.METHOD(PATH, HANDLER)
- METHOD is a http request method.
- PATH is a path on the server.
- HANDLER is a function executed when the route is matched.
*/
// Home
app.get('/', (req, res) => {
    const { session: { userId, token, query } } = req
    debugger
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

// Search
app.get('/search', (req, res) => {
    const { query: { q: query }, session: { userId, token } } = req

    session.query = query

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

// Duck detail
app.get('/ducks/:id', (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])

            // Parsing JSON content (string) to turn it into a Javascript object.
        /*  const duck = JSON.parse(content) */
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
    } catch (error) {
        throw error
    }
})

// Register
app.get('/sign-up', (req, res) => {
    const { session: { lang = 'en' }} = req

    res.send(Html(Register(literals[lang].signUp, '/sign-up')))
})

app.post('/sign-up', parseBody, (req, res) => {
    const { body } = req

    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess('/sign-in'))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

// Login
app.get('/sign-in', (req, res) => {
    const { session: { lang = 'en' }} = req

    res.send(Html(Login(literals[lang].signIn, '/sign-in')))
})

app.post('/sign-in', parseBody, (req, res) => {
    const { body, session } = req

    const { email, password } = body

    try {
        logic.authenticateUser(email, password)
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

// Logout
app.post('/sign-out', (req, res) => {
    const { session } = req

    delete session.userId
    delete session.token

    res.redirect('/')
})

// Binding and listening for connections on the specified host and port.
app.listen(port)