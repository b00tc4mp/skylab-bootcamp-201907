# NODE

##LEARNYOUNODE


**3**
**My first I/O**
>const fs = require('fs')
>
>const fileBuffer= fs.readFileSync(process.argv[2]) -> 
>Go read the file. This method will return a Buffer object containing the complete contents of the file. 
**4**
**ASYNC I/O**
>fs.readFile()
>to read a file in async way
>function callback (err, data) { /* ... */ } 
>

## fs.writeFile
- escribe el contenido de un archivo (data)
## fs.createReadStream
- lee un torrente de información en stream
rs
## fs.createWriteStream
- copia un torrente de información en stream
ws
## rs.pipe(ws)
- esta preparado para ir pasando chunk a chunk los datos 

## precess.memoryUsage
- para saber la memoria del proceso
## concat-stream
- response.pipe(cs(content=>..)) No tiene error handly

## http.server
- ver los archivos de local en internet

## async
- guarda las respuestas asyncronas

## time server
- crear un servidor tcp al cual conectarnos, es el tubo por donde viaja los chunks (http)
- se conecta a unos socket

# HTTP
- si lo igualamos a una variable devuelve un objeto que es una respuesta
- http.get: envia una respuesta de una petición
- puede lanzar un error de del envio de la petición que lo preveemos fuera o un error que trae la respuesta que lo indicamos dentro

- data se lanza cuando recibe una parte de la información de la url (chunk) El numero de chunks sera diferente cada vez que se realize la comunicación

# SERVER TCP
## IP
- direccion que le ponemos a una maquina parasituarla en ua red
- conectarse a una ip de otro usuario: en navegador http://+192.168.0.34+:8080, por el lado de fuera, desde la red
- nuestra propia red local en lugar de ip, ponemos localhost

## Socket
- Es un objeto que nos indica quien se a ha conectado a nosotros
- para dar respuesta, escribimos socket.write() 
- socket.end()

## createServer
- req es stream: permite enviar datos en forma de torrente
- res es stream: permite recibir datos en forma de torrente

##console.dir
- nos da la informacion de iso y query

##writeHead
- cors header

#SERVIDOR EXPRESS NODE EXPRES.JS    
ls node_modules/
