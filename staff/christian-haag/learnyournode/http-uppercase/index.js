const http = require('http')
const map = require('through2-map')

const { argv: [, , port] } = process

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(response)
    } else {
        error => { throw error }
    }
})
server.listen(port)

/* SECOND APROACH
const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        let content = ''
        request.on('data', chunk => content += chunk)
        request.on('end', () => {
            const uppercase = content.toUpperCase()

            response.end(uppercase)
        })
        request.on('error', error => { throw error })
    }
})
server.listen(port)
*/