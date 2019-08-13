const fs = require('fs')
const http = require('http')

const { argv : [ , , port , file]} = process

const server = http.createServer( (req , res)=> {
    fs.createReadStream(file).pipe(res) // === const rs = fs.createReadStream(file); rs.pipe(res);
}).listen(port)