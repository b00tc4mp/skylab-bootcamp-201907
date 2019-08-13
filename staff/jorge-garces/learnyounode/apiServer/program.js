const http = require('http')
const url = require('url')


const { argv: [, , port] } = process

const server = http.createServer((request, response) => {
    debugger


})

server.listen(port)