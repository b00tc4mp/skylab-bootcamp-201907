const net = require('net')
const strftime = require('strftime')
const { argv: [, , portNumber] }= process
// cuando algo se conecta al servidor, lanzar la fecha
const server = net.createServer(function(socket){
    let date= new Date
    const output= strftime('%Y-%m-%d %H:%M\n', date)
    socket.end(output)

    })

server.listen(portNumber)