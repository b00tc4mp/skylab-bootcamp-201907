const express = require('express')
const http = require('http')
const { Html, Header, Search, DuckResults, DuckDetail } = require('./components')

const { argv: [, , port] } = process

const app = express()

let sessionIds = 0
const sessions = {}


// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    const sid = sessionIds++

    sessions[sid] = {}

    res.setHeader('Set-Cookie', [`session-id=${sid}`]);

    res.send(Html(Search()))
})

function parseCookieSessionId(req) {
    const { headers: { cookie } } = req

    const keyValues = cookie.split(';').map(keyValue => keyValue.trim())

    const keyValue = keyValues.find(keyValue => keyValue.startsWith('session-id'))

    const [, sid] = keyValue.split('=')

    return sid
}

app.get('/search', (req, res) => {
    const { query: { q } } = req

    const sid = parseCookieSessionId(req)

    const session = sessions[sid]

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
    const { params: { id } } = req

    const sid = parseCookieSessionId(req)

    const session = sessions[sid]

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