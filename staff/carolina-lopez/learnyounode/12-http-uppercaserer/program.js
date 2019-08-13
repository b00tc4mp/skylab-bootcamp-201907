const http = require('http')

const { argv : [, , port] } = process

const server = http.createServer((request, response) =>{
  if(request.method === 'POST') {
    let content = ''

    request.on('data', chunk => content += chunk)

    request.on('end', () => {
      const uppercase = content.toUpperCase()

      response.end(uppercase)
    })
  }
})

server.listen(port)