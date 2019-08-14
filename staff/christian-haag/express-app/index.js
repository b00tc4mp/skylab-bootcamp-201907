const express = require('express')
const http = require('http')
const fs = require('fs')
const { argv: [, , port] } = process
const app = express()


// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})



app.get('/search', (req, response) => {
    const query = req.query.q
    let data = ''

    http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, res => {
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
            const json = JSON.parse(data)
            debugger
            let list = json.map(item => {
                const { title, imageUrl, price } = item
                return `<li>
                <h2>${title}</h2>
                <img src=${imageUrl} />
                <p>${price}</p>
                </li>`
            })
            response.send(`<ul>${list.join('')}</ul>`)
        })
        res.on('error', error => { response.send(error) })
    })

})
app.listen(port)



