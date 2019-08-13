const net = require('net')
const { argv: [, , portNumber] }= process
// cuando algo se conecta al servidor, lanzar la fecha
const server = net.createServer(function(socket){
    let date= new Date()
    const output= date.getFullYear()+' - ' +(0+(date.getMonth()+1)).slice(-2)+' - '+(0+date.getDate().slice(-2))+' '+ (0+date.getHours()).slice(-2)+':'+ (0+date.getMinutes().slice(-2))+"\n"
    socket.end(output)

    })

server.listen(portNumber)