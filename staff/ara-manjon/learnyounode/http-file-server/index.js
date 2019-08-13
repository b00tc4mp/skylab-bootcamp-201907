const http= require('http')
const fs = require('fs')

const { argv: [, , port, file] }= process
const server = http.createServer((req, res)=>{
    const rs= fs.createReadSteam(file)
    rs.pipe(res)

})

server.listen(port)