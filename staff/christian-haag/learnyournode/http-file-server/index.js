const fs = require('fs')
const http = require('http')

const { argv: [, , port, file] } = process

const server = http.createServer((request, response) => {
    const readStream = fs.createReadStream(file).pipe(response)
})

server.listen(port)

/*---------------learnyounode--------------------
 var http = require('http')
    var fs = require('fs')

    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })

      fs.createReadStream(process.argv[3]).pipe(res)
    })

    server.listen(Number(process.argv[2]))

*/