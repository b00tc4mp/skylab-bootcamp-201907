const net = require('net')

const { argv : [ , , port]} = process

const date = new Date()
const year = date.getFullYear()  
const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
const minutes = date.getMinutes()

const currentDate = `${year}-${month}-${day} ${hour}:${minutes}`

const server = net.createServer( socket => {
    // socket.write(currentDate)
    socket.end(currentDate + "\n")
})
    .on('error' , error => {throw error})
    .listen(port)

// server.listen(port)