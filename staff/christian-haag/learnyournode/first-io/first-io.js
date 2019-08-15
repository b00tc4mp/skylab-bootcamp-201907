var fs = require('fs')

const file = fs.readFileSync(process.argv[2])
const str = file.toString()
const result = str.match(/\r?\n/g).length

console.log(result)