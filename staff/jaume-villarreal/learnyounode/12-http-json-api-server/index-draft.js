const http = require('http') 
let url = require('url')
const { argv : [ , , port] } = process


const server = http.createServer((request , response) => {
    // url = url.parse(request.url , false)
    url = url.parse(request.url , true)
    console.log(url)
    console.log('ISO' , url.query.iso)
    console.log('AUTH' ,url.auth)
    console.log('SEARCH' , url.search)
    console.log('QUERY' , url.query)
}).listen(port)

