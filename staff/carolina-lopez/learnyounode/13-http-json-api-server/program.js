const http = require('http')
const url = require('url')

const { argv : [,, port] } = process

const server = http.createServer((request, response) => {
  const { pathname, query : {iso}} = url.parse(request.url, true)

  const date = new Date(iso)
  let output, json
  

  switch (pathname){
    case '/api/parsetime':
      
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      const output = {hour, minute, second}

      const json = JSON.stringify(output)

      response.writeHead(200, {'Content-Type' : 'application/json'})

      response.end(json)
      break
    case 'api/unixtime':      
      const unixtime = date.getTime()

      output = { unixtime }

      json = JSON.stringify(output)

      response.writeHead(200, {'Content-Type' : 'application/json'})

      response.end(json)
  }
})

server.listen(port)