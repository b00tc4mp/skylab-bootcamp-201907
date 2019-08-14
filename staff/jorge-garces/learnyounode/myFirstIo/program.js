var fs = require('fs')
var hola = fs.readFileSync(process.argv[2]).toString().split('\n')
console.log(hola.length - 1)