const express = require('express')

const { argv: [, , port] } = process

const app = express()




//'http://duckling-api.herokuapp.com/api/search?q='

// http://localhost:8080/ => <form><input name="query">...</form>

app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})

app.get(`http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`, (req, res) => {
    res.send(`ok, searching... ${req.query.q}`)

    res.setEncoding('utf8')

    res.on('error', error => { throw error })

    res.on('data', chunk => console.log(chunk))

    // TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...
})

app.listen(port)