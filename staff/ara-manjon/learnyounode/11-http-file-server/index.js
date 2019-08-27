const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

const server = http.createServer((req, res) => {
    // const rs = fs.createReadStream(file)
    // rs.pipe(res)

    fs.createReadStream(file).pipe(res)
})

server.listen(port)  