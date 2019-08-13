const http = require("http")
const express = require('express')



const { argv: [, , port] } = process

const app = express()

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
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
    
    const request = http.get( url, response => {
        let content =""
        response.on("data", chunk => content += chunk)
        response.on(end,()=> {
            const jsonData = JSON.parse(content)
            let ducks= jsonData.map(duck => {
                const {title, imageUrl, price} = duck
                return `<li>
                    <h2>${title}</h2>
                    <img src=${imageUrl}/>
                    <span>${price}</span>            
            </li> `
            });
            res.send(`<ul>${ducks.join("")}</ul>`)
        })
        // TODO call duckling api endpoint that searches ducks, wait for the answer and the return ducks in <UL><LI>...
    })

    request.on("error", error => { throw error})
})



app.listen(port)