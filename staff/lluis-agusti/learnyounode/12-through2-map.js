var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (request, response) {
 if (request.method != 'POST')
   return response.end('send me a POST\n')

 request.pipe(map(function (chunk) { //recojer el body de la 
   return chunk.toString().toUpperCase()
 })).pipe(response)
})

server.listen(Number(process.argv[2]))


// podemos hacer a mano la recojidea de chunks y juntarlos.

//COMMANDO ------> CURL
// para conectar con un server.
