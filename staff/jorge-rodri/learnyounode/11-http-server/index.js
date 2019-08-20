const fs = require("fs");
const http = require ("http");
const portNumber = process.argv[2];
const file = process.argv[3];

http.createServer(function(req, res) {
    res.writeHead(200, { "content-type" : "text/plain" });
    console.log(portNumber, file)
    fs.createReadStream(file).pipe(res);
    }).listen(portNumber);