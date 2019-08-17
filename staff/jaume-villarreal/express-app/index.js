const express = require('express')
const app = express()

const session = require('express-session')

const logic = require('./logic')

const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: true })

const { argv: [, , port] } = process

const {
    Html, Header, DuckResults,
    DuckDetail, Register,
    RegisterSuccess, Login, Favorites
} = require('./components')

const {
    HOME, SEARCH, SIGN_IN,
    SIGN_UP, SIGN_OUT, DETAIL,
    TOGGLE_FAV, SELECT_LANG, FAVORITES
} = require('./paths')

//app.use
app.use(express.static('public'))

// app.use( (request , respone , next) => {
//     const st = express.static('public')
//     request
// }

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

    session.query = query
    session.view = `${SEARCH}?q=${query}`

    const { userId, token, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
                .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, lang)}${DuckResults(ducks)}`)))
                .catch(error => { throw error })
        else
            logic.searchDucks(undefined, undefined, query)
                .then(ducks => res.send(Html(`${Header(undefined, query, lang)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})

app.get(`${DETAIL}/:id/`, (req, res) => {

    //  console.log(req.path)
    
    const { params: { id: duckId }, session } = req

    session.view = `${DETAIL}/${duckId}`

    const { userId, token, query, lang } = session

    try {
        if (userId && token)
            Promise.all([
                logic.retrieveUser(userId, token),
                logic.retrieveDuck(userId, token, duckId)
            ])
                .then(([user, duck]) => res.send(Html(`${Header(user.name, query, lang)}${DuckDetail(duck)}`)))
                .catch(error => { throw error })
        else
            logic.retrieveDuck(undefined, undefined, duckId)
                .then(duck => res.send(Html(`${Header(undefined, query, lang)}${DuckDetail(duck)}`)))
    } catch (error) {
        throw error
    }
})

app.get(SIGN_UP, (req, res) => {
    const { session } = req

    session.view = SIGN_UP

    const { lang } = session

    res.send(Html(Register(lang)))
})

app.post(SIGN_UP, formBodyParser, (req, res) => {
    const { body, session: { lang } } = req

    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.send(Html(RegisterSuccess(lang))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get(SIGN_IN, (req, res) => {
    const { session } = req

    session.view = SIGN_IN

    const { lang } = session

    res.send(Html(Login(lang)))
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
                .then(() => res.redirect(view))
                .catch(error => { throw error })
        } catch (error) {
            throw error
        }
    else res.redirect(SIGN_IN)
})

app.get(FAVORITES , (request , response) => {
    const { session } = request
    const { userId, token, query, lang } = session
    
    session.view = FAVORITES

    try{
        Promise.all([
            logic.retrieveUser(userId,token),
            logic.retrieveFavDucks(userId,token)
        ])
        .then(( [ user , ducks ] ) => response.send(Html(`${Header(user.name, query, lang)}${Favorites(ducks , lang)}`)))
        .catch( error => {throw error})    
    } catch(error){
        throw error
    }    
})

app.post(FAVORITES , formBodyParser , (request , response) => {
    response.redirect(FAVORITES)
})

app.post(SELECT_LANG, formBodyParser, (req, res) => {
    const { body: { lang }, session } = req

    session.lang = lang

    const { view } = session

    res.redirect(view)
})

app.listen(port)