const express = require('express')
const http = require('http')
const { Html, Header, Search, DuckResults, DuckDetail, Register, RegisterSuccess, Login, HomeHeader, FavButton } = require('./components')
const session = require('express-session')
const { parseBody } = require('./utils')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.get('/', (req, res) => {
    res.send(Html(`${Header(`${Search()}`)}`))
})

app.get('/search', (req, res) => {
    const { query: { q }, session: { userId, token } } = req

    if(!session.query || q) session.query = q 
    try {
        logic.searchDucks(userId, token,  session.query)
            .then(ducks => res.send(Html(`${HomeHeader()}${Search(q)}${DuckResults(ducks)}`)))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/ducks/:id', (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req

    try {
        logic.retrieveDuck(userId, token, duckId)
            .then(duck => res.send(Html(`${Header(`${Search(query)}`)}${DuckDetail(duck)}`)))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/sign-up', (req, res) => {
    res.send(Html(Register('/sign-up')))
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

app.get('/sign-in', (req, res) => {
    res.send(Html(Login('/sign-in')))
})

app.post('/sign-in', parseBody, (req, res) => {
    const { body, session } = req

    const { email, password } = body

    try {
        logic.authenticateUser(email, password)
            .then(({ id, token }) => {
                session.userId = id
                session.token = token
                
                res.redirect('/home')
            })
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/home', (req, res) => {
    const { session: {userId, token} } = req
    logic.retrieveUser(userId, token)
        .then(response => res.send(Html(`${HomeHeader(response.name)}${Search()}`)))
}) 

app.get("/goToLanding", (req, res) =>{
    res.send(Html(`${Header(`${Search()}`)}`))
})

 app.post("/onToggle", parseBody, (req, res) =>{
    const { body: {duckId, path}, session: { userId, token } } = req

        if (userId && token) 
            logic.toggleFavDuck(userId, token, duckId)
                .then(() => res.redirect(path))
                .catch((error) => console.log(error))
        
        else res.redirect("/sign-in")
    })
app.get("/goToFav", (req, res)=>{
    const { session: { userId, token} } = req

    Promise.all ([
        logic.retrieveUser(userId, token),
        logic.retrieveFavDucks(userId, token)
    ])
            .then(([response, ducks]) => res.send(Html(`${HomeHeader(response.name)}${Search()}${DuckResults(ducks)}`)))
})

app.listen(port)