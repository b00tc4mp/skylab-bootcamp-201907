const express = require('express')
const app = express()
const http = require('http')

const { argv : [ , , port]} = process

const endPointDucks = "http://duckling-api.herokuapp.com/api/search?q="


// const form =    render(`<form action="/search">
//                     <input type= text name="q" id="q"
//                     <br/>
//                     <button>Search</button>
//                 </form>`)

const form =    `<form action="/search">
                    <input type= text name="q" id="q"
                    <br/>
                    <button>Search</button>
                </form> `


app.get('/' , (request , response) => {
    response.send(form)
})

app.get('/search' , (request , response) => {
    const { query:{ q:search }} = request

    const httpRequest = http.get(`${endPointDucks}${search}` , res => {
        res.on('error' , error => {throw error})
        
        let ducks = ''

        res.on('data' , chunk => ducks += chunk )
        
        res.on('end' , () => {
            ducks = JSON.parse(ducks)

            if(ducks.error) throw new Error(ducks.error)

            response.send(paintListDucks(ducks)).on('error' , error => {throw error})
        })
    })
    httpRequest.on('error' , error => { throw error })
})

app.listen(port)

const render = body => {
    return `<!DOCTYPE html>
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

const paintListDucks = ducks => {
    let urlString = `<a href="/">BACK</a><ul>`
    ducks.forEach( duck => {
        urlString +=    `<li>
                            <h2>${duck.title}</h2>  
                            <img src='${duck.imageUrl}'/>  
                            <span>${duck.price}</span>
                        </li>`
    })
    urlString += '</ul>'
    return urlString
}