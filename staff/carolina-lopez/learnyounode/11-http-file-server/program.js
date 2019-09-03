const http = require('http')
const fs = require('fs')

const { argv : [, , port, file] } = process


const server = http.createServer((request, response) => {
  // const rs = fs.createReadStream(file)
  // rs.pipe(response)

  fs.createReadStream(file).pipe(response)
})

server.listen(port)


