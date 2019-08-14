const express = require('express')
const http = require('http')
const { argv: [, , port] } = process
const app = express()
// http://localhost:8080/ => <form><input name="query">...</form>
app.get('', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})

function renderHtml() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      
  </body>
  </html>`
}

function renderSearch() {
  return `<header>
  ${content}
  </header>`
}

function renderHeader(content) {
  return `<header>
  ${content}
  </header>`
}
app.get('/search', (req, res) => {
    //  res.send(`ok, searching... ${req.query.q}`)
    const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`
    http.get(url, response => {
      let content = ''
      response.on('data', chunk => content += chunk)
      response.on('end', () => {
        const jsonData = JSON.parse(content)

        const ducks = jsonData.map(duck => {
          const {title, imageUrl, price, id} = duck
          return `<li><a href="">
            <h2>${title}</h2>
            <img src=${imageUrl} />
            <span>${price}</span>
            <span>${id}</span></a>
            </li>`
        })
        res.send(`<ul>${ducks.join('')}</ul>`)
      })
    })
})

app.get('/duck/:id', (req, res) => {
    const { params: {id } }= req

    const url = `http://duckling-api.herokuapp.com/api/ducks${id}`
    http.get(url, response => {
      let content = ''
      response.on('data', chunk => content += chunk)
      response.on('end', () => {
        const duck = JSON.parse(content)
        // const duck = jsonData.map(duck => {

          const {title, imageUrl, price, description, link} = duck
          
          return `<li>
            <h2>${title}</h2>
            <img src=${imageUrl} />
            <span>${price}</span>
            <p>${description}</p>
            <a href="${link}" target="_blank">Link to Store</a>
            </li>`
        })
        res.send(`<ul>${duck}</ul>`)
}

app.listen(port)