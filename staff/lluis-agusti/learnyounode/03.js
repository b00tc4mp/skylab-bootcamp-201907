const fs = require('fs')
const { argv: [, , file] } = process

const content = fs.readFileSync(file, 'utf8')

const lines = content.match(/\r?\n/g).length

console.log(lines)