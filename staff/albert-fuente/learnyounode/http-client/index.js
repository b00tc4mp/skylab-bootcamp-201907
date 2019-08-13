/* const http = require('http')

const{argv:[,,url]}=process 

http.get(url,response=>{
  response.setEncoding("utf8")
  response.on("error",error=>{throw error})
  response.on("data",content=> console.log(content))
})

.on("error", error=>{throw error})
 */

/**
 * program that performs an HTTP get request to a URL
 * http core moduel 
 * http.get() method is a shortcut for simple get requests 
 * first argument to http.get() can be the url you want 
 * second argument is the callback 
 * the 3 events that are of most interest: DATA ERROR CONTENT
 * data event is emitted when a chunk of data is available 
 */

 const http=require("http")

 http.get(process.argv[2],response=>{
   response.setEncoding("utf8")
   response.on("error",error=>{throw error})
   response.on("data",content=>console.log(content))
 })
 .on("error",error=>{throw error})


 /*se parece al fetch
 hhtp.get establece una conexion y dispara el callback response
 cuando hay respuesta ocurre los response, 
 se declaran handlers manejadores de los eventos, los nombres vienen especificados por la docu
 con el on determinamos la respuesta en caso de error y de data
 el evento response.on data nos envia el content a traves de un callback
 puedes tener error de IDA el ultimo error o error de VUELTA  cuando dentro nos sale error
 el GET devuelve un client request

 const request=htttp.get(url,response=>{
   response.setEncdoing("ut8")
   response.on("error",error=>{throw error})
   response.on("data", content=>console.log(content))
 })
 */