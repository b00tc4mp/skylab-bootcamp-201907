const net = require('net')

const {argv: [,, port] } = process

const server = net.createServer(socket => {
    var d = new Date();
    var data =
    d.getUTCFullYear() + "-" +
    ("0" + (d.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + d.getUTCDate()).slice(-2) + " " +
    ("0" + (d.getUTCHours() + 2)).slice(-2) + ":" +
    ("0" + d.getUTCMinutes()).slice(-2) + '\n'
    socket.end(data)
})
server.listen(port)