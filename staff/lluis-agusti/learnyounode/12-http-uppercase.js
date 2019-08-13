var http = require('http')
var map = require('through2-map')

const { argv :[ ,,url]}= process;

var server = http.createServer(function (req, res) {
    if (req.method === 'POST')
  res.writeHead(200, { 'content-type': 'text/plain' })
 
  fs.createWriteStream(ext).pipe(res.toString().toUppercase())
})
 
server.listen(Number(folder))