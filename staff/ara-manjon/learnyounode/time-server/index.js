const net = require('net')
const { argv: [, , portNumber] }= process

const server = net.createServer(function(socket){
    socket.write(data => {
        console.log(date.getFullYear()+' - ' +date.getMonth()+' - '+date.getDate()+' '+ date.getHours()+':'+ date.getMinutes())
    socket.end()

    })
})

server.listen(portNumber)