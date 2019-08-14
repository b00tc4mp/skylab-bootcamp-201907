const http = require('http')
const map = require('through2-map') 

//const options = {method: 'POST', port: process.argv[2]} //--> Nop, no va

const server = http.createServer((req, res) => {
  if (req.method === 'POST'){
    req.pipe(map(function (chunk) {  
      return chunk.toString().toUpperCase()
    })).pipe(res)
  }
})

server.listen(process.argv[2])
