const http = require('http')
const fs = require('fs')

/* const port = process.argv[2]
const file = process.argv[3] */
const { argv: [,, port, file]} = process

// Like the net module, http also has a method named http.createServer() but this one creates a server that can talk HTTP. http.createServer() takes a callback that is called once for each connection received by your server.
// request is used to fetch properties.
// response is used to send data to the client.
const server = http.createServer((request, response) => {
    /* response.writeHead(200, { 'content-type': 'text/plain' }) ??*/

    // The fs core module also has some streaming APIs for files. You will need to use the fs.createReadStream() method to create a stream representing the file you are given as a command-line argument. The method returns a stream object which you can use src.pipe(dst) to pipe the data from the src stream to the dst stream. In this way you can connect a filesystem stream with an HTTP response stream.
    fs.createReadStream(file).pipe(response)
})
// http.createServer() also returns an instance of your server. You must call server.listen(portNumber) to start listening on a particular port.
server.listen(Number(port))