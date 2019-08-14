const express = require('express')
const http = require('http')
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
    // res.send(`ok, searching... ${req.query.q}`)
    const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`
    //const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}` //--> Yo puse HTTP
    http.get(url, response => {
        let content = ''
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(duck => {
                const { title, imageUrl, price, id } = duck
                return `<a href="/detail/${id}/"><li>
                  <h2>${title}</h2>
                  <img src=${imageUrl} />
                  <span>${price}</span>
                  </li></a>`
            })
            res.send(`<ul>${ducks.join('')}</ul>`)
        })
    })
})

app.get('/detail/:id', (req, res) => {
    let data = ''
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${req.params.id}`, response => {
        response.on('error', error => res.send(error.message))
        response.on('data', chunk => data += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(data)
            if (jsonData.error) throw new Error(jsonData.error)
            const { title, imageUrl, price, description, link } = jsonData
            const htmlResponse = `
                    <h2>${title}</h2>
                    <img src=${imageUrl}></img>
                    <p>${description}</p>
                    <p>${price}</p>
                    <a href=${link} target="_blank">Buy this ducks on STORE</a>
                    `
            res.send(htmlResponse)
        })
    })
})

app.listen(8000)