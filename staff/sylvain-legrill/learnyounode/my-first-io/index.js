const fs = require('fs')

const {argc: [, , file] } = process 

const constent = fs.readFileSync(file, 'utf8')

const lines = constent.match(/\r?\n/g).length

console.log(lines)
