const http = require('http')
const express = require('express')

const { argv: [, , port] } = process

const app = express()

function renderHtml(body) {
    `<!DOCTYPE html>
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

function renderHeader(content) {
    `<header>
        ${content}
    </header>`
}

function renderSearch() {
    return `<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`
}

app.get('/', (req, res) => {
    res.send(renderHtml())
})

app.get('/search', (req, res) => {
    //res.send(`ok, searching... ${req.query.q}`)
    let data = ''
    const query = req.query.q

    http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, response => {
        response.on('error', error => res.send(error.message))
        response.on('data', chunk=> data += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(data)
            if (jsonData.error) throw new Error(jsonData.error)
            const duckDetails = jsonData.map(duck => {
                const { title, imageUrl, price, id } = duck
                return `<li>
                    <a href="/ducks/${id}">
                    <h2>${title}</h2>
                    <img src=${imageUrl}></img>
                    <p>${price}</p>
                    </a>
                    </li>`
            })
            const htmlResponse = `<ul>${duckDetails.join('')}</ul>`
            res.send(renderHtml(htmlResponse))
        })
    }).on('error', error => console.log(error))
})

app.get('/ducks/:id', (req, res) => {
    const {params: {id} } = req
    if (id.length !== 24) res.send(render('<h1>Page not found</h1>'))
    let data = ''
     http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on('error', error => res.send(error.message))
        response.on('data', chunk=> data += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(data)
            if (jsonData.error) throw new Error(jsonData.error)
            const { title, imageUrl, price, description, link } = jsonData 
            const htmlResponse = `
                    <article>
                        <h2>${title}</h2>
                        <img src=${imageUrl}></img>
                        <p>${description}</p>
                        <p>${price}</p>
                        <a href=${link} target="_blank">Go to store</a>
                    </article>
                    `
            res.send(renderHtml(htmlResponse))
        })
    })

})
app.listen(port)