/* const express = require('express')
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
    //  res.send(`ok, searching... ${req.query.q}`)
    const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`
    http.get(url, response => {
        let content = ''
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(duck => {
                const { title, imageUrl, price, id } = duck
                return `<a href="/ducks/${id}">
            <li>
            <h2>${title}</h2>
            <img src=${imageUrl}></img>
            <span>${price}</span>
            </li>
            </a>`
            })
            res.send(`<ul>${ducks.join('')}</ul>`)

        })
    })
})

app.get("/ducks/:id", (req, res) => {
  let data = ''
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${req.param.id}`, response => {
      // res.method === 'GET' && res.writeHead(200, {'content-type':'application/json'})
        response.on('data', chunk => data += chunk)
        response.on('end', () => {
            let duck = JSON.parse(content)
                const { title, imageUrl, price, description, link } = duck
                res.send(render(
                  `<article>
                  <h2>${title}</h2>
                  <img src=${imageUrl}></img>
                  <span>${price}</span>
                  <span>${description}</span>
                  <a href="${link}" target="_blank">Go to store</a>
                  </article>
                  `
                ))
            })
        })
        
    })

    // TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...

app.listen(port) */

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
    const query = req.query.q
    let data = ''
    http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, response => {
        response.on('data', chunk => data += chunk)
        response.on('end', () => {
            const ducks = JSON.parse(data)
            if (ducks.error) throw new Error(ducks.error)
            let duckDetails = ducks.map(duck => {
                const { title, imageUrl, price, id } = duck
                return `<li>
                <a href='/ducks/${id}'>
                        <h2>${title}</h2>
                        <img src=${imageUrl}></img>
                        <p>${price}</p>
                        </a></li>`
            })
            const htmlResponse = `<ul>${duckDetails.join('')}</ul>`
            res.send(htmlResponse)
        })
    }).on('error', error => console.log(error))
})
app.get('/ducks/:id', (req, res) => {
    let data = ''
    const { params: { id } } = req
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on('error', error => res.send(error.message))
        response.on('data', chunk => data += chunk)
        response.on('end', () => {
            const jsonData = JSON.parse(data)
            if (jsonData.error) throw new Error(jsonData.error)
            const { title, imageUrl, price, description, link } = jsonData
            const htmlResponse = `<article>
                    <h2>${title}</h2>
                    <img src=${imageUrl}></img>
                    <p>${description}</p>
                    <p>${price}</p>
                    <a href=${link} target='_blank'>Link</a>
                    </article>
                    `
            res.send(htmlResponse)
        })
    })
})
// TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...
app.listen(port)
