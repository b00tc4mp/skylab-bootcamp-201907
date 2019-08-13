var fs = require('fs')
const { argv: [,, file]}
const content = fs.readFileSync(file, 'utf8')
const lines = content.split('\n').length -1
console.log(lines)

// with match and regex