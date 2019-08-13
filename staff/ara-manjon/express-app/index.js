const http= require('http')
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

app.get('/search', (req, res) => {
    const {query:{q} }= req
    
    const url= `http://duckling-api.herokuapp.com/api/search?q=${q}`
    http.get(url, response=>{
        let content= ''
        response.on('data', chunk => content += chunk)
        response.on('end', ()=> {
            const ducksJson = JSON.parse(content)
            const ducks= ducksJson.map(duck=>{
                const { title, imageUrl }= duck
                
                return `<li>
                <h3>${duck.title}</h3>
                
                <img src=${duck.imageUrl} />
                </li>`
            })
            res.send(`<ul>${ducks.join('')}</ul>`)
    })
    
})

})
app.listen(port)