const express = require('express')

const { argv : [ , , port]} = process

const app = express()

const form =    `<form action="/search">
                    <input type= text name="q" id="q"
                    <br/>
                    <button>Search<b/utton>
                </form> `


app.get('/' , (request , response) => {
    response.send(form)
})

    .get("/search" , (request , response) => {
        const { query : { q }} = request
        response.send(`<h1>You are searching ${q}.</h1>`)
    })

    .listen(port)