
const fs = require('fs')

const { argv: [, , port, file] }= process
const server = http.createServer((req, res)=>{
    if(req.method === 'POST')
    let content = ''
    rq.on('data', chunk => content += chunk)
    rq.on('end', ()=> {
        const uppercase = content.toUpperCase()
    })

})

server.listen(port)