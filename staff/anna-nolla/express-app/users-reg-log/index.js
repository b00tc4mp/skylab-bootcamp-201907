const express = require('express')
const http = require('http')
const { Html, Header, Search, DuckResults, DuckDetail, Register, Login, HomeHeader } = require('./components')
const { authenticateUser, registerUser, retrieveDuck, retrieveFavDucks, retrieveUser, searchDucks, toggleFavDuck } = require('./logic')
const session = require('express-session')
const bodyParser = require('body-parser')

const { argv: [, , port] } = process

const app = express()
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng'
}));

app.get('/', (req, res) => {
    res.send(Html(`${Header()}${Search()}`))
})

app.get('/search', (req, res) => {
    const { query: { q }, session } = req

    session.query = q

    const request = http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const ducks = JSON.parse(content)

            if (ducks.error) throw new Error(ducks.error)

            res.send(Html(`${Header()}${Search(session.query)}${DuckResults(ducks)}`))
        })
    })

    request.on('error', error => { throw error })
})

app.get('/ducks/:id', (req, res) => {
    const { params: { id }, session } = req

    const request = http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const duck = JSON.parse(content)

            if (duck.error) throw new Error(duck.error)

            res.send(Html(`${Header()}${Search(session.query)}${DuckDetail(duck)}`))
        })
    })

    request.on('error', error => { throw error })
})


app.get('/register', (req, res) => {
    res.send(Html(Register()))
})

app.post('/register', (req, res) => {
    const { name, surname, email, password, repassword } = req.body
    registerUser(name, surname, email, password, repassword)
    res.send(`<h3>Registered successfully</h3>`)
})

app.get('/login', (req, res) => {
    res.send(Html(Login()))
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    authenticateUser(email, password)
        .then(data => retrieveUser(data.id, data.token))
        .then(response => res.send(Html(`<h3>Hello, ${response.name}</h3>${HomeHeader()}${Search()}`)))
})

app.get("/goToLanding", (req, res) =>{
    res.send(res.send(Html(`${Header()}${Search()}`)))
})

app.listen(port)