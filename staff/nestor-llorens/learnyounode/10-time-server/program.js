const net = require('net')

const date = new Date();
const output = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)+' '+date.getHours()+':'+('0' + date.getMinutes()).slice(-2)+'\n'

const server = net.createServer(socket => {  
    socket.end(output)
     
  })  
  server.listen(process.argv[2]) 