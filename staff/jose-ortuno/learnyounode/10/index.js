const net = require('net')
const { argv: [, , port] } = process
const strftime = require('strftime')

const server = net.createServer(socket => {
    const date = new Date
    // example: "2013-07-06 17:42"

    const formatted = strftime('%Y-%m-%d %H:%M\n', date)

    socket.end(formatted)
})
server.listen(port)