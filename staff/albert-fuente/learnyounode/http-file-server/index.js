
var http = require ("http");
var portNumber = process.argv[2];
var file = process.argv[3];
http.createServer(function(req, res) {
    res.writeHead(200, { "content-type" : "text/plain" });
    
    fs.createReadStream(file).pipe(res);
    }).listen(portNumber);