let fs = require('fs')
let re = /\r?\n/g
fs.readFile(process.argv[2],'utf8', (err,data)=>{
    var content = data.toString()
    console.log(content.match(re).length)
})