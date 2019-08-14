const net = require('net')

const {argv: [,, port] } = process

const server = net.createServer(socket => {
    var d = new Date();
    var data =
    d.getUTCFullYear() + "-" +
    ("0" + (d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + " " +
    ("0" + (d.getHours())).slice(-2) + ":" +
    ("0" + d.getMinutes()).slice(-2) + '\n'
    socket.end(data)
})
server.listen(port)
