const net = require('net')
const { argv: [, , port] } = process

function checkZero(val) {
    return val < 10 ? '0' + val : val
}

function dateNow() {
    const date = new Date()
    return `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())} ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}`
}

const server = net.createServer(function listener(socket) {
    socket.end(dateNow() + '\n')
})

server.listen(port)