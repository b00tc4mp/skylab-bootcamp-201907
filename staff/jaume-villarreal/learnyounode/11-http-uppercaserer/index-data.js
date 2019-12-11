// curl _X POST -d 'hola mundo' http://localhost:8080

const http = require('http')
const map = require('through2-map')

const { argv : [ , , port] } = process

const server = http.createServer((request , response) => {
    if(request.method === 'POST'){
        response.writeHead(200 , {'content-type' : 'test/plain'})
        let content = ''
        
        request.on('data' , chunk => content += chunk)

        request.on('end' , () => {
            const uppercased = content.toUpperCase()

            response.end(uppercased)
        })
    }else{
        response.writeHead(405)
    }
}).listen(port)