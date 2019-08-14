const express = require('express')
const http = require('http')

const { argv: [, , port] } = process
const app = express()

app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <input type="text" name="carolina">
        <button>Search</button>
    </form>`)
})

app.get('/pepito', (req, res) => {
    res.send(`<div>
        <h3>pepito</h3>
        <a href="/">Search</a>
    </div>`)
})

app.get('/search', (req, res) => {
    const { query: { q } } = req
    const url = `http://duckling-api.herokuapp.com/api/search?q=${q}`
    const request = http.get(url, response => {
        let content = ''
        response.on('error', error => {throw new Error(error)})
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(({ title, imageUrl, price }) =>
                `<li>
                    <h2>${title}</h2>
                    <img src=${imageUrl} />
                    <span>${price}</span>
                </li>`
            )

            res.send(`<ul>${ducks.join('')}</ul>`)
        })

    }).on('error', error => {throw new Error(error)})

    request.on('error', error => { throw error })

})

app.listen(port)