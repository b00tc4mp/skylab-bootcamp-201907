/**
 * Write a program that performs an HTTP GET request to a URL provided to you  
   as the first command-line argument. Write the String contents of each  
   "data" event from the response to a new line on the console (stdout). 
 */


//for check if runs : node . //http: google.es

//respuesta del get: response.on son eventos: data and error vienen del get
const http = require('http')
const { argv: [, , url] }= process

var request= http.get(url, response => {
    response.setEncoding('utf8')
    response.on('error', error => {throw error})// cuando la url envia un error

    response.on('data', content => console.log(content))
}).on('error', error => {throw error}) //cuando se produce un error en el envio

/* para recopilar toda la información data 
let content= ''
response.on('data', chunk => content += chunk)
response.on('end', ()=> console.log(content))
*/

/* var http = require('http')
    
http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error) */