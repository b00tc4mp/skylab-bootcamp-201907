const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const { Html, Header, Search, DuckResults, DuckDetail, Register, Login, RegisterSuccess } = require('./components')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const { argv: [, , port] } = process

const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: false })
let fileStoreOptions = {}
let userData = {}
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'my secret phrase'
}))

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(Html(Search()))
})

app.get('/register', (req, res) => {
    res.send(Html(Register()))
})

app.post('/register', urlencodedParser, (req, res) => {
    const { body } = req
    session.user = body.name
    fetch('https://skylabcoders.herokuapp.com/api/user', {
        method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => {
            json.status === 'OK' && res.send(RegisterSuccess())
        })
})


app.get('/login', (req, res) => {
    res.send(Html(Login()))
})

app.post('/login', urlencodedParser, (req, res) => {
    const { body } = req

    fetch(`https://skylabcoders.herokuapp.com/api/auth`, {
        method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => {

            userData.credentials = json
            json.status === 'OK' && res.send(Html(`${Header(session.user)} ${Search()}`))
            console.log(session)

        })
    //
    //body.username === json.data.username && body.password === json.data.password && res.send(Html(Search()))
})

app.get('/search', (req, res) => {
    const { query: { q } } = req

    session.query = q

    const request = http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const ducks = JSON.parse(content)

            if (ducks.error) throw new Error(ducks.error)

            res.send(Html(`${Header(session.user)}${Search(session.query)}${DuckResults(ducks)}`))
        })
    })

    request.on('error', error => { throw error })
})


app.get('/ducks/:id', (req, res) => {
    const { params: { id } } = req

    const request = http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const duck = JSON.parse(content)

            if (duck.error) throw new Error(duck.error)

            res.send(Html(`${Header(session.user)}${Search(session.query)}${DuckDetail(duck)}`))
        })
    })

    request.on('error', error => { throw error })
})

app.listen(port)