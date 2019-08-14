const express = require('express')
const app = express()
const http = require('http')

const { argv : [ , , port]} = process

const endpointDucks = "http://duckling-api.herokuapp.com/api/search?q="


const form =    `<form action="/search">
                    <input type= text name="q" id="q"
                    <br/>
                    <button>Search<b/utton>
                </form> `


app.get('/' , (request , response) => {
    response.send(form)
})

app.get('/search' , (request , response) => {
    const { query:{ q:search }} = request

    http.get(endpointDucks + search , res => {
        res.on('error' , error => {throw error})
        
        let ducks = ''
        res.on('data' , chunk => ducks += chunk )
        
        res.on('end' , () => {
            ducks = JSON.parse(ducks)
            response.send(listDucks(ducks))
            .on('error' , error => {throw error})
        })
    })
})

app.listen(port)


const listDucks = ducks => {
    let urlString = '<ul>'
    ducks.forEach( duck => {
        urlString +=    `<li>
                            <h2>${duck.title}</h2>  
                            <img src='${duck.imageUrl}'/>  
                            <p>${duck.price}</p>
                        </li>`
    })
    urlString += '</ul>'
    return urlString
}