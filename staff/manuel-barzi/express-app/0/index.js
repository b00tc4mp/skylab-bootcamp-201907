const express = require('express')
const http = require('http')

const { argv: [, , port] } = process

const app = express()

function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        ${body}
    </body>
    </html>`
}

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(render(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`))
})

app.get('/search', (req, res) => {
    const { query: { q } } = req

    const request = http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const ducks = JSON.parse(content)

            if (ducks.error) throw new Error(ducks.error)

            const output = `<ul>${ducks.map(({ id, title, imageUrl, price }) => `<li>
                <a href="/ducks/${id}">
                    <h3>${title}</h3>
                    <img src="${imageUrl}">
                    <span>${price}</span>
                </a>
            </li>`).join('')}</ul>`

            res.send(render(output))
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

            const { title, imageUrl, price, description, link } = duck

            const output = `<article>
                <h3>${title}</h3>
                <img src="${imageUrl}">
                <span>${price}</span>
                <p>${description}</p>
                <a href="${link}" target="_blank">Go to store</a>
            </article>`

            res.send(render(output))
        })
    })

    request.on('error', error => { throw error })
})

app.listen(port)