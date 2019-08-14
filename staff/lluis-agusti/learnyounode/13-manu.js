const http = require('http')
const url = require('url')

const { argv: [, , port] } = process
 
parsetime = (time) => {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

unixtime = (time) => {
  return { unixtime : time.getTime() }
}
 
const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true)

  const time = new Date(parsedUrl.query.iso)
  let result
 
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
server.listen(Number(port)) 


