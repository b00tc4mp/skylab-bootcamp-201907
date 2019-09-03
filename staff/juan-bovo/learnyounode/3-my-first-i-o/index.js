var fs = require('fs')

var buf = fs.readFileSync(process.argv[2])

var newLines = buf.toString().match(/\r?\n/g).length


console.log(newLines)