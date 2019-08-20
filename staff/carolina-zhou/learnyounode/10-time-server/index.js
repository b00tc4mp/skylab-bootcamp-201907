// 0. For this exercise we'll be creating a raw TCP server. There's no HTTP involved here so we need to use the net module from Node core which has all the basic networking functions.
const net = require('net')

// 3. The zeroFill function determines if a zero should be placed in front of a value.  If ‘i’ is less than 10, i < 10 evaluates to true, and zeroFill returns ‘0’ + i.  If ‘i’ is not less than 10, i < 10 evaluates to false, and zeroFill returns an empty string + ‘i’.
zeroFill = (i) => {
  return (i < 10 ? '0' : '') + i
}

// 4. The now function formats de date and time using the Date() object assigned to the variable d.
now = () => {
  let date = new Date()
  return date.getFullYear() + '-'
    + zeroFill(date.getMonth() + 1) + '-'
    + zeroFill(date.getDate()) + ' '
    + zeroFill(date.getHours()) + ':'
    + zeroFill(date.getMinutes())
}
 
// 1. The net module has a method named net.createServer() that takes a function. The function that you need to pass to it is a connection listener that is called more than once. Every connection received by your server triggers another call to the listener.
const server = net.createServer((socket) => {
  socket.end(now() + '\n') /* Note[1]*/
})
// 2. net.createServer() also returns an instance of your server. You must call server.listen(portNumber) to start listening on a particular port. Use the port number supplied as the first command-line argument.
server.listen(Number(process.argv[2]))


/* Note[1]: The socket object contains a lot of meta-data regarding the connection,
  but it is also a Node duplex Stream, in that it can be both read from, and
  written to. For this exercise we only need to write data and then close
  the socket.

  Use socket.write(data) to write data to the socket and socket.end() to
  close the socket. Alternatively, the .end() method also takes a data
  object so you can simplify to just: socket.end(data).

  Documentation on the net module can be found by pointing your browser
  here:

  file://C:\Users\Carolina Zhou
Lin\AppData\Roaming\npm\node_modules\learnyounode\node_apidoc\net.html*/




// Alternative Solution
/* 
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

server.listen(port)  */