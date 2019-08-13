var fs = require('fs')

var anna = process.argv[2]

var output = fs.readFileSync(anna)

output = output.toString().split('\n')

console.log(output.length - 1)


