const express = require('express')
const http = require('http')

const { argv: [, , port] } = process
const app = express()

app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
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
        response.on('error', error => { throw new Error(error) })
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(({ title, imageUrl, price, id }) =>
                `<li>
                    <a href=/duck/${id}>
                        <h2>${title}</h2>
                        <img src="${imageUrl}" />
                        <span>${price}</span>
                    </a>
                </li>`
            )

            res.send(`<ul>${ducks.join('')}</ul>`)
        })

    }).on('error', error => { throw new Error(error) })

    request.on('error', error => { throw error })

})

app.get('/duck/:id', (req, res) => {
    const { params: { id } } = req
    const url = `http://duckling-api.herokuapp.com/api/ducks/${id}`
    const request = http.get(url, response => {
        let content = ''
        response.on('error', error => { throw new Error(error) })
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)

            const { title, imageUrl, price, description, link } = jsonData

            res.send(`<section>
                <h1>${title}</h1>
                <img src="${imageUrl}" />
                <span>${price}</span>
                <p>${description}</p>
                <a href=${link} target="_blank">Go to store</a>
            </section>`)
        })

    }).on('error', error => { throw new Error(error) })

    request.on('error', error => { throw error })

})

app.listen(port)