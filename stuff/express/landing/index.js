const express = require('express')

const { argv: [,, port ]} = process

const app = express()

// http://localhost:8080/hola?name=Pepito => <h1>Hola, Pepito!</h1>
app.get('/hola', (req, res) => {
    const { query: { name }} = req

    res.send(`<h1>Hola, ${name}!</h1>`)
})

app.listen(port)