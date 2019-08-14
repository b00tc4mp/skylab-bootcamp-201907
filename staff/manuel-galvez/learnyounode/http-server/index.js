const http = require('http')
const fs = require('fs')


const {argv: [,,port,filepath]} = process

const server = http.createServer((request, response) => {
    const fileStream = fs.createReadStream(filepath)
    fileStream.pipe(response)
})
server.listen(port)