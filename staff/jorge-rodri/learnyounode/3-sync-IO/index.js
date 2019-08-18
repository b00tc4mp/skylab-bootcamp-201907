let fs = require('fs')

const buff = fs.readFileSync(process.argv[2]).toString().split('\n')

console.log(buff.length-1)