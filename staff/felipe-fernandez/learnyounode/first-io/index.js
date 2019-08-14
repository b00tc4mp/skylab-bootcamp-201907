 let fs = require('fs')
let file = fs.readFileSync(process.argv[2])
let strFile = file.toString()
let result =  strFile.split('\n')
console.log(result.length-1) 

