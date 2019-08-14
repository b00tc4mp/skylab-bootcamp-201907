const net = require('net')
const strftime = require('strftime')
const {argv: [,, port]}=process

const server = net.createServer(socket=>{
   
    const date= new Date
    const formatted = strftime('%Y-%m-%d %H:%M', date) + '\n'
    socket.end(formatted)
})


server.listen(port)