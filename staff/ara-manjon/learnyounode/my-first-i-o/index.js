const fs = require('fs')


const fileBuffer= fs.readFileSync(process.argv[2])
const fileString = fileBuffer.toString()


console.log(fileString.split('\n').length - 1)


/* 
const fs = require('fs')
const {argv: [,,file]} = process
const lines = constent.match(/\r?n/g).length

console.log(lines)
 */


