
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
app.get('/search', (req, res) => {
    //  res.send(`ok, searching... ${req.query.q}`)
    const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`
    http.get(url, response => {
      let content = ''
      response.on('data', chunk => content += chunk)
      response.on('end', () => {
        const jsonData = JSON.parse(content)



        const ducks = jsonData.map(duck => {
          const {title, imageUrl, price} = duck
          return `<li>
            <h2>${title}</h2>
            <img src=${imageUrl} />
            <span>${price}</span>
            </li>`
        })
        res.send(`<ul>${ducks.join('')}</ul>`)
      })
    })
    // TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...
})


app.get('/ducks/id', (req, res) => {
  const { query: { id }} = req

  const request = http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
      response.on('error', error => { throw error })

      let content = ''

      response.on('data', chunk => content += chunk)

      response.on('end', () => {
          const ducks = JSON.parse(content)

          if (ducks.error) throw new Error(ducks.error)

          const output = `<ul>${ducks.map(({ id, title, imageUrl, price, description, link}) => `<li>
              <h3>${title}</h3>
              <img src="${imageUrl}">
              <span>${price}</span>
              <p>${description}</p>
              <a href=${link}>Go to store</a>
          </li>`).join('')}</ul>`

          res.send(render(output))
      })
  })

  request.on('error', error => { throw error })
})

app.listen(port)    


// http://duckling-api.herokuapp.com/api/ducks/${duckId}

