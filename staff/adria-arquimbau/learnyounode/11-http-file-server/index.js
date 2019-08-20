var http = require('http')
var fs = require('fs')
 
const { argv:  [, , port, file]} = process

 
const server = http.createServer((req, res) => {

  //const rs =   fs.createReadStream(file)
  //pipe(res)

  fs.createReadStream(file).pipe(res)
})

server.listen(port)