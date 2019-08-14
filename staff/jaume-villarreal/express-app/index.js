const express = require('express')
const app = express()
const http = require('http')

const { argv : [ , , port]} = process

const {Html , Header , Search , DuckResults , DuckDetail} = require('./components')

const endPointSearchDucks = "http://duckling-api.herokuapp.com/api/search?q="
const endPointDetailDuck = "http://duckling-api.herokuapp.com/api/ducks/"

app.get('/' , (request , response) => {
    response.send(Html(Search()))
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

            response.send(Html(`${Search()}${DuckResults(ducks)}`)).on('error' , error => {throw error})
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

            response.send(Html(`${Search()}${DuckDetail(duck)}`)).on('error' , error => {throw error})
        })
    })
    httpRequest.on('error' , error => { throw error })
})

app.listen(port)