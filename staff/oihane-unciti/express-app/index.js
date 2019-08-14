const express = require('express')
const http = require("http")

const { argv: [, , port] } = process

const app = express()

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})

/* app.get('/login', (req, res) => {

    var usuario = req.query.user;
    var contrasena = req.query.password;

    //accedo a la base de datos

    res.send(`<h1>Holiii!!!!${req.query.user} y ${req.query.password}</h1>`)
}) */

    
app.get('/search', (req, res) => {
    const url = `http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`
    
    http.get( url, response => {
        let content =""
        response.on("data", chunk => content += chunk)
        response.on("end",()=> {
            const jsonData = JSON.parse(content)
            let ducks= jsonData.map(duck => {
                const {title, imageUrl, price, id} = duck
                return `<a href="/ducks/${id}"><li>
                        <h3>${title}</h3>
                        <img src=${imageUrl}></img>
                        <p>${price}</p>
                    </li></a>`
            
            })
            res.send(`<ul>${ducks.join("")}</ul>`)


            })
        })

    })

app.get("/ducks/:id", (req, res) => {
    const url  = `http://duckling-api.herokuapp.com/api/ducks/${req.params.id}`
    http.get(url , response =>{
        res.method === "GET" && res.writeHead(200, { "content-Type": "application/json" })
        let data = ""
        response.on("data", chunck => data += chunck)
        response.on("end", () => {
            let duck = JSON.parse(data)
            const { title, imageUrl, price, description } = duck
            res.send(render(`<h3>${title}</h3>
                            <img src=${imageUrl}></img>
                            <p>${price}</p>
                            <p>${description}</p>` )
                    )
        })
    })

})
app.listen(port)