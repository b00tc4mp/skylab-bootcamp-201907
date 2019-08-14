const express = require('express')
const http = require('http')

const { argv: [, , port] } = process
const app = express()


function renderHtml(content) {
    return `<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document</title>
 </head>
 <body>
     ${content}
 </body>
 </html>`
}

function renderHeader(content) {
    return `<header> 
    ${content}
    </header>`
}

function renderSearch() {
    return `<form action="/search">
<input type="text" name="q">
<button>Search</button>
</form>`
}

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(renderHtml(renderSearch()))
})

app.get('/search', (req, response) => {
    const query = req.query.q


    http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, res => {
        res.on('error', error => { throw error })

        let data = ''

        res.on('data', chunk => data += chunk)

        res.on('end', () => {

            const ducks = JSON.parse(data)

            response.send(renderHtml(`${renderSearch()}${renderDucks(ducks)}`))
        })
        res.on('error', error => { response.send(error) })
    })
    req.on('error', error => { throw error })
})


function renderDucks(ducks) {
    const { title, imageUrl, price, id } = item
    let list = ducks.map(item => {
        `<li><a href="/ducks/${id}">
    <h2>${title}</h2>
    <img src=${imageUrl} />
    <p>${price}</p>
    </a></li>`})

    return `<ul>${list}</ul>`
}


app.get('/ducks/:id', (req, response) => {
    const { params: { id } } = req
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, res => {
        res.on('error', error => { throw error })

        let data = ''

        res.on('data', chunk => data += chunk)

        res.on('end', () => {

            const duck = JSON.parse(data)

            const { title, imageUrl, price, description, link } = duck


            let htmlResponse = `<article>
                <h2>${title}</h2>
                <img src=${imageUrl} />
                <p>${price}</p>
                <p>${description}</p>
                <a href="${link} target='blank> Go to Store</a>
                </article>`

            response.send(renderHtml(htmlResponse))
        })
        res.on('error', error => { response.send(error) })
    })
    req.on('error', error => { throw error })
})

app.listen(port)



