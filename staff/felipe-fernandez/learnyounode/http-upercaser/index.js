const map = require('through2-map')
const http = require('http')

const { argv: [, , port] } = process
const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(response)
    }
})
server.listen(port)