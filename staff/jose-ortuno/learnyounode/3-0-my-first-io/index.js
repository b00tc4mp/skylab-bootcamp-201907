var fs = require('fs')
const read = fs.readFileSync(process.argv[2])
const readStr = read.toString()
const count = readStr.split('\n')
console.log(count.length-1)

