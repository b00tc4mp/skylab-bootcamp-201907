const net = require("net")

// var server = net.createServer(socket => {
//     console.log(process.argv[2])
//     date = new Date
//     // socket handling logic  
//     socket.write(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
//     socket.end(data)
// })
function zeroLeft (num) {
    return (num < 10 ? '0' : '') + num
}

const server = net.createServer(socket => {
    //console.log(process.argv[2])
    date = new Date
    // socket handling logic  
    socket.write(`${date.getFullYear()}-${zeroLeft(date.getMonth()+1)}-${zeroLeft(date.getDate())} ${zeroLeft(date.getHours())}:${zeroLeft(date.getMinutes())}`+'\n')
    socket.end(data)
})

// Esto fue suerte, por eso lo comento y lo pongo bien:
// server.listen(process.argv[2], () => {
//     function listener(socket){
//         console.log(socket)
//     }
// })

server.listen(Number(process.argv[2]))