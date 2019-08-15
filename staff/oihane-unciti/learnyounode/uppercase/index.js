var http = require('http')
var map = require('through2-map')
 
var server = http.createServer(function (req, res) {
 if (req.method === 'POST')

  req.pipe(map(function (chunk) {
      /* let content =""

   req.on("data", chunck => content += chunck )
   
   r*/
   var aux = chunk.toString()
   var result = aux.toUpperCase()
   return result
 
})).pipe(res)
})
 
server.listen(Number(process.argv[2]))