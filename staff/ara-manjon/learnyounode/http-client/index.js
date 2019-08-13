//node . //http: google.es

//respuesta del get: response.on son eventos: data and error vienen del get
const http = require('http')
const { argv: [, , url] }= process

var request= http.get(url, response => {
    response.setEncoding('utf8')
    response.on('error', error => {throw error})// cuando la url envia un error

    response.on('data', content => console.log(content))
})
request.on('error', error => {throw error}) //cuando se produce un error en el envio

/* para recopilar toda la información data 
let content= ''
response.on('data', chunk => content += chunk)
response.on('end', ()=> console.log(content))
*/