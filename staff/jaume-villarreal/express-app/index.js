const express = require('express')
const app = express()
const http = require('http')

const { argv : [ , , port]} = process

const endPointSearchDucks = "http://duckling-api.herokuapp.com/api/search?q="
const endPointDetailDuck = "http://duckling-api.herokuapp.com/api/ducks/"

app.get('/' , (request , response) => {
    response.send(renderSearch())
})

app.get('/search' , (request , response) => {

    const { query:{ q:search }} = request

    const httpRequest = http.get(`${endPointSearchDucks}${search}` , res => {
        res.on('error' , error => {throw error})
        
        let ducks = ''

        res.on('data' , chunk => ducks += chunk )
        
        res.on('end' , () => {
            ducks = JSON.parse(ducks)

            if(ducks.error) throw new Error(ducks.error)

            response.send(renderListDucks(ducks , search)).on('error' , error => {throw error})
        })
    })
    httpRequest.on('error' , error => { throw error })
})

app.get('/ducks/:idDuck' , (request , response) => {
    
    const { params : { idDuck } } = request

    const httpRequest = http.get(`${endPointDetailDuck}${idDuck}` , res => {
        res.on('error' , error => {throw error})
        
        let duck = ''

        res.on('data' , chunk => duck += chunk )
        
        res.on('end' , () => {
            duck = JSON.parse(duck)

            if(duck.error) throw new Error(duck.error)

            response.send(renderDetailDuck(duck)).on('error' , error => {throw error})
        })
    })
    httpRequest.on('error' , error => { throw error })
})

app.listen(port)

function render(body){
    return  `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Duck Express</title>
                    </head>
                    <body>
                        ${body}
                    </body>
                </html>`
}

function renderSearch(){
    return `<form action="/search">
                    <input type= text name="q" id="q"
                    <br/>
                    <button>Search</button>
                </form> `
}   

const renderListDucks = (ducks , search) => {
    let urlString = `<a href="/">BACK</a><ul><span>${search}</span>`
    ducks.forEach( duck => {
        urlString +=    `<li>
                            <a href="/ducks/${duck.id}">
                                <h2>${duck.title}</h2>  
                                <img src='${duck.imageUrl}'/>  
                                <span>${duck.price}</span>
                            </a>
                        </li>`
    })
    urlString += '</ul>'
    return urlString
}

const renderDetailDuck = duck => {
    let urlString = `<a href="search/">BACK</a><ul>`
        urlString +=    `<article>
                            <h2>${duck.title}</h2>  
                            <img src='${duck.imageUrl}'/>  
                            <p>${duck.description}</p>
                            <span>${duck.price}</span>
                            <a href="${duck.link}" target="_blank">Go to store</a>
                        </article>`
    return urlString
}