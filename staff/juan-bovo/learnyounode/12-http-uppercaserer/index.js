const http = require('http')
var map = require('through2-map') 

const options = {method: 'POST', port: process.argv[2]}

const server = http.createServer(options, (res) => {
    const outStream = []

    res.pipe(map(chunk => {  
        chunk.toString().toUpperCase() //.split('').reverse().join('')
        outStream.push(chunk)
      })).pipe(outStream)
})


server.listen(process.argv[2])