const http=require("http")
const fs=require("fs")

const{argv:[,,port,file]}=process


const server=http.createServer(function(request,response){
    const rs=fs.createReadStream(file)
    rs.pipe(response)
})
server.listen(port)






/*
SERVIDOR DE ARCHIVOS
arancar servidor y devolver el archivo
vamos a crear un servidor http
con el NET solo trabajavamos con tcp
un http tiene req y response
el callback nos permite acceder a la peticion y la respuesta no solo respuesta como en tcp
podemos hacer un post y enviar json o formulario
cuando me venga una peti tengo que devolver un fichero 
req nos permite acceder a los datos de entrada
result nos permite acceder a los datos de salida
request y response son dos streams y objetos, stream de lectura y stream de escritura permiten concatenar y enviar datos 
los datos que leo los envio por pipe



const http=require("http")
const fs=require("fs")

const{argv:[,,portNumber,file]}=process

http.createServer(request,response){
    res.writeHead(200,{"content-type":"text/plain"})
    console.log(portNumber,file)

    const stream=fs.createReadStream(file)
    stream.pipe(response)

}
server.listen(8000)
 */