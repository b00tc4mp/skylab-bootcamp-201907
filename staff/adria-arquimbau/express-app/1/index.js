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

app.get('/search', (req, res) => {
    
    let data = ''
    const query = req.query.q
    http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, response => {
        response.on('data', chunk => data += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(data)
            let duckDetails = jsonData.map(duck => {
                const { title, imageUrl, price } = duck
                    return `<li>
                        <h2>${title}</h2>
                        <img src=${imageUrl}></img>
                        <p>${price})</p>
                    </li>`
            })
            const htmlResponse = `<ul>${duckDetails.join('')}</ul>`
            res.send(htmlResponse)
        })
    }).on('error', error => console.log(error))
})

app.listen(port)