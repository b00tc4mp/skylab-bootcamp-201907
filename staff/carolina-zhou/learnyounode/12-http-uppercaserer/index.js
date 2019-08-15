const http = require('http')
// There are a number of different packages in npm that you can use to "transform" stream data as it's passing through. For this exercise the through2-map package offers the simplest API.
const map = require('through2-map')
 
let server = http.createServer((request, response) => {
 if (request.method != 'POST')
   return response.end('send me a POST\n')
   // through2-map allows you to create a transform stream using only a single function that takes a chunk of data and returns a chunk of data. It's designed to work much like Array#map() but for streams:
   request.pipe(map((chunk) => {
   return chunk.toString().toUpperCase()
 })).pipe(response)
})
 
server.listen(Number(process.argv[2]))


// Alternative solution:
/* 
const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let content = ''

        req.on('data', chunk => content += chunk)

        req.on('end', () => {
            const uppercase = content.toUpperCase()

            res.end(uppercase)
        })
    }
        
})

server.listen(port) */