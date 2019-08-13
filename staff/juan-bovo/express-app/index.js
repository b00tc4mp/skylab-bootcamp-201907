const express = require('express')

const { argv: [, , port] } = process

const app = express()

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})

app.get('/search', (req, res) => {
    res.send(`ok, searching... ${req.query.q}`)

    // TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...
})

app.listen(8000)