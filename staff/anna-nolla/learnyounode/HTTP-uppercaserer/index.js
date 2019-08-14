// var http = require("http")
// var map = require("through2-map")

// var server = http.createServer((req,res) =>{
//     if (req.method === "POST"){
//         req.pipe(map(chunk => {
//             return chunk.toString().toUpperCase()
//         })).pipe(res)
//     }
// })

// server.listen(Number(process.argv[2]))

var http = require("http")

var server = http.createServer((req, res)=>{
    var result = ""
    req.setEncoding("utf8")
    req.on("data", chunk => result += chunk)
    req.on("end", () => res.end(result.toUpperCase()))
})
server.listen(process.argv[2])