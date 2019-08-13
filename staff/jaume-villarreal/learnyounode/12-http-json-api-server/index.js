const http = require('http') 
let url = require('url')
const { argv : [ , , port] } = process

const getTime = () => {
    return{
        hour: getHour
    }
}

const server = http.createServer( (request , response) =>{
    url = url.parse(request.url , true)
    console.log(url.path)
}).listen(port)




























