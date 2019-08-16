const http = require('http')

let str = ''

const server = http.createServer((req, res) => {

    req.setEncoding('utf8')
    
    req.on('error', error => {throw Error(error)})
    req.on('data', data => str += data)
    req.on('end', () => res.end(str.toUpperCase()))    
})
server.listen(process.argv[2])