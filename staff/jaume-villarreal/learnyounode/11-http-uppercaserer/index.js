const http = require('http')
const map = require('through2-map')

const { argv : [ , , port] } = process

const server = http.createServer((request , response) => {
    if(request.method === 'POST'){
        response.writeHead(200 , {'content-type' : 'test/plain'})
        request
            .pipe(map(chunk => chunk.toString().toUpperCase()))
            .pipe(response)
    }else{
        response.writeHead(405)
    }
}).listen(port)