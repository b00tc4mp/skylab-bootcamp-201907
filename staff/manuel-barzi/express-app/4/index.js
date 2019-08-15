const express = require('express')
const http = require('http')
const { Html, Header, Search, DuckResults, DuckDetail } = require('./components')
const session = require('express-session')
// const FileStore = require('session-file-store')(session);

const { argv: [, , port] } = process

const app = express()
 
app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng'
}));


app.get('/', (req, res) => {
    res.send(Html(Search()))
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

            res.send(Html(`${Search(session.query)}${DuckResults(ducks)}`))
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

            res.send(Html(`${Search(session.query)}${DuckDetail(duck)}`))
        })
    })

    request.on('error', error => { throw error })
})

app.listen(port)