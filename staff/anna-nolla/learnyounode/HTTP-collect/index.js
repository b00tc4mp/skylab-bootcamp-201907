var http = require('http')
var str = ''

http.get(process.argv[2], response => {
    response.setEncoding('utf8')
    response.on('error', error => {throw Error(error)})
    response.on('data', data => str += data)
    response.on('end', () => {console.log(str.length)
        console.log(str)})
})