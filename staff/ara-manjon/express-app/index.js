const http = require('http')
const express = require('express')
const {
    argv: [, , port]
} = process
const app = express()
// http://localhost:8080/ => <form><input name="query">...</form>

app.get('/', (req, res) => {
    res.send(renderHtml(renderSearch()))
})

function

function renderHeader(content){
    return `<header>
        ${content}
    </header>`
}

app.get('/search', (req, res) => {
    const {
        query: {
            q
        }
    } = req

    const url = `http://duckling-api.herokuapp.com/api/search?q=${q}`
    http.get(url, response => {
        response.on('error', error => {
            throw error
        })
        let content = ''
        response.on('data', chunk => content += chunk)
        response.on('end', () => {

            const ducksJson = JSON.parse(content)
            if (ducksJson.error) throw new Error(ducksJson.error)

            const ducks = ducksJson.map(duck => {
                const {
                    title,
                    imageUrl,
                    price,
                    id
                } = duck

                return `<li>
                <a href="/ducks/${id}">
                <h3>${title}</h3>
                
                <img src=${imageUrl} />

                <p>${price}</p>
                </a>
                </li>`
            })
            res.send(`<ul>${ducks.join('')}</ul>`)

        })

    })

})
app.get('/ducks/:id', (req, res) => {
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${req.params.id}`, response=>{
        
    response.on('error', error => {
            throw error
        })
        let content = ''
        response.on('data', chunk => content += chunk)
        response.on('end', () => {

            const duckJson = JSON.parse(content)
            if (duckJson.error) throw new Error(duckJson.error)

                const { title,imageUrl,price,description,link } = duck

                res.send( `<article>
                <h3>${title}</h3>
                
                <img src=${imageUrl} />

                <p>${price}</p>
                <p>${description}</p>
                <a href=${link} target="_blank">Go to store</a>
                </article>`)
           })         

    })

})
app.listen(port)