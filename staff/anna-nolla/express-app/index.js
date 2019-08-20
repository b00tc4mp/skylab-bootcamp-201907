const express = require('express')
const http = require("http")


const { argv: [, , port] } = process

const app = express()

function render(content) {
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
function renderHeader(content){
    return `<header>${content}</header>`
}
function renderSearch(){
    return `<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`
}

// http://localhost:8080/ => <form><input name="query">...</form>
app.get('/', (req, res) => {
    res.send(render(renderHeader(renderSearch())))
})

app.get('/search', (req, res) => {


    http.get(`http://duckling-api.herokuapp.com/api/search?q=${req.query.q}`, response => {
        res.method === "GET" && res.writeHead(200, { "content-Type": "application/json" })
        let data = ""
        response.on("data", chunck => data += chunck)

        response.on("end", () => {
            let ducks = JSON.parse(data)
            res.send(render(`<ul>${ducks.map(duck => {
                const { title, imageUrl, price, id } = duck
                    return `<li>
                        <a href="/ducks/${id}">
                            <h3>${title}</h3>
                            <img src=${imageUrl}></img>
                            <p>${price}</p>
                        </a>
                    </li>`})}${ducks.join("")}</ul>`))
            })
    })
})
app.get("/ducks/:id", (req, res) => {
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${req.params.id}`, response => { 
        res.method === "GET" && res.writeHead(200, { "content-Type": "application/json" })
        let data = ""
        response.on("data", chunck => data += chunck)

        response.on("end", () => {
            let duck = JSON.parse(data)
            const { title, imageUrl, price, description, link } = duck
            res.send(render(`<h3>${title}</h3>
                            <img src=${imageUrl}></img>
                            <p>${price}</p>
                            <p>${description}</p>
                            <a href = ${link} target = "_blank">Store</a>`
            
            ))
        })
    })
})
app.listen(port)



