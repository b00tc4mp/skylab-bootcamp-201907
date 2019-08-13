var fs = require("fs")
var path = require('path')

var filepath = process.argv[2]
var fileExt = "." + process.argv[3]

fs.readdir(filepath, (err, arg) => {
    if(err) throw error
    arg.forEach(function (arg) {
        if (path.extname(arg) === fileExt){
            console.log(arg)
        } else { }
    })

})