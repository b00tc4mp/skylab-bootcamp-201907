var fs = require("fs")

var filepath = process.argv[2]
// en vez del toString() podriamos poner - utf8 -
// y en vez del split() - match(/\r?\n/g) -

var res = fs.readFileSync(filepath).toString().split("\n")

// en el cas de les Regex no faria falta posar el -1 
console.log(res.length - 1)
