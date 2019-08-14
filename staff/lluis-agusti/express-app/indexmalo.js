const http = require('http')
const express = require('express')

const { argv: [, , port] } = process
const app = express()

app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`) // envia al navegador un text, que al ser html puede crear el firmulario.
})

app.get('/search', (req, res) => {

    const url = `http://duckling-api.herokuapp.com/pi/search?=${req.query.q}`
    http.get(url, response => {
        let content = ''

        // response.on('error', error => { throw error })
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)
            let ducks = jsonData.map(duck => {
                const {title, imageUrl, price } = duck
                return `<li>
                <h2>${title}<h2>
                <img src=${imageUrl} />
                <span>${price}<span>
                </li>`
            })
            res.send(`<ul>${ducks.join('')}</ul>`)
        })
    })

    // request.on('error', error => {throw error })
})

app.listen(port)