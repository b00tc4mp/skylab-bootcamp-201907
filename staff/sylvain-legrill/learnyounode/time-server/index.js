// nc 192.168.0.34 8080

const net = require('net')
const strftime = require('strftime')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    //console.log(socket)

    // HTTP response demo
    //     socket.end(`HTTP/1.1 200 OK
    // Content-Type: text/html

    // Hello world!`)

    const date = new Date

    const formatted = strftime('%Y-%m-%d %H:%M\n', date) // YYYY-MM-DD hh:mm

    socket.end(formatted)
})

server.listen(port) 