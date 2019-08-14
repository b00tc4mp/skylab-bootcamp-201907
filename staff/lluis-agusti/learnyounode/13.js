var http = require('http')
var url = require('url')
 
function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime : time.getTime() }
}
 
var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result
 debugger
  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)
 
  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))







// class version!






/*
const http = require('http')
const url = require('url')

const { argv :[ ,,port]}= process;

const server = http.createServer(function (request, response) {
const parsed = url






  if (request.method != 'POST')
    return response.end('send me a POST\n')
 
  request.pipe(map(function (chunk) { //recojer el body de la 
    return chunk.toString().toUpperCase()
  })).pipe(response)
 })


 // debugger de node! metodos exec
 // pathname === endpoint

 */