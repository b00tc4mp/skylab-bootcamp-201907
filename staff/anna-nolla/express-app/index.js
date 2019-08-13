const express = require('express')
const http = require("http")


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
    
    let data = ""

    http.get(`http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`, response => {
        res.method === "GET" && res.writeHead(200, {"content-Type": "application/json"})
        
        response.on("data", chunck => data += chunck)
        response.on("end", () => {
            let ducks = JSON.parse(data).map(duck=>{
                const { title, imageUrl, price } = duck
                return `<li>
                        <h3>${title}</h3>
                        <img src=${imageUrl}></img>
                        <p>${price}</p>
                    </li>`
            })
        res.send(`<ul>${ducks.join("")}</ul>`)
        })
    })

    // TODO call duckling api endpoint that searches ducks, http://localhost:8080/
    // wait for the answer and the return ducks in <UL><LI>...
})

app.listen(port)

