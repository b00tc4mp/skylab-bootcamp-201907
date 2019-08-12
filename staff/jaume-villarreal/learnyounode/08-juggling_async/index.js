const http = require('http')
const bl = require('bl')
let counter = 0
const responses = []

// const { argv :  [, , [urls] ]  } = process
const urls = process.argv.slice(2)
let lng = urls.length

urls.forEach( (url => {
    http.get( url , response => {
        response.pipe( bl ((error , data) =>{
            data = data.toString()

            if(error) throw error

            responses.push(data)

            lng--

            if(lng === 0){
                responses.forEach( response => console.log(response))
            }
        }))
    })
})