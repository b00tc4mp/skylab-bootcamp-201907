const http = require('http')

const {argv: [,,url] } = process

http.get(url, response => {

    response.setEncoding('utf8')
    response.on('error', error => {throw Error(error)})
    response.on('data', data => console.log(data) )
    
    

})