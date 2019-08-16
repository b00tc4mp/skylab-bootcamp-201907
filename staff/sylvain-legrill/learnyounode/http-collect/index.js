const http = require('http')
const bl = require('bl')
const { argv: [, , url] }= process


http.get(url, response => {
    // pipe 
    response.pipe(bl((error, data) =>{
        response.setEncoding('utf8')
        response.on('error', error => { throw error })        
        console.log(data.toString().length)
        console.log(data.toString())    
    }))
})