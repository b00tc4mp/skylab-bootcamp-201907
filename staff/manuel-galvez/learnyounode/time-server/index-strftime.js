const net = require('net')
const strftime = require('strftime')

const {argv: [,, port] } = process

const server = net.createServer(socket => {
    const data = strftime('%Y-%m-%d %H:%M') + '\n'
    socket.end(data)
})
server.listen(port)