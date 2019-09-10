var fs = require("fs")
var arg = process.argv[2]


fs.readFile(arg, function(err, content){
    if (err) throw error
    
    var res = content.toString().split("\n")
    console.log(res.length -1)
})