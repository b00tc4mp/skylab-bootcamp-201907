var http = require('http')
var fs = require('fs')
const { argv :[ ,,folder, ext]}= process;
 
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
 
  fs.createReadStream(ext).pipe(res)
})
 
server.listen(Number(folder))