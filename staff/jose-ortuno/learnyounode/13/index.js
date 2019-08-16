const http = require('http')
let url = require('url')
const { argv : [ , , port] } = process
const server = http.createServer((request , response) => {
    response.writeHead(200 , {'content-type' : 'application/json'})
    //parse URL => acces to URL Object properties
    const parsedURL = url.parse(request.url , true)
    // retrieve API's endpoints
    const path = parsedURL.pathname
    // retrieve date from URL's Query Object => property 'iso'
    const date = new Date(parsedURL.query.iso)
    let output = ''
    if(path === '/api/parsetime'){
        output = {
            hour : date.getHours(),
            minute : date.getMinutes(),
            second : date.getSeconds()
        }
    }else if(path==='/api/unixtime'){
        output = { unixtime : date.getTime() }
    }
    response.end(JSON.stringify(output))
}).listen(port)