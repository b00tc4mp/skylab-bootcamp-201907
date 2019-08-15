const net = require('net')

const server = net.createServer(socket => {
    console.log('sever connected')
})
server.listen(8000)