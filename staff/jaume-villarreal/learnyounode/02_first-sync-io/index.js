var fs = require('fs')

const file = fs.readFileSync(process.argv[2]).toString();

// const lines = file.split("\n")

// console.log(lines.length-1)


const BREAK_REGEX = /\r?\n/g

const lines = file.match(BREAK_REGEX).length
console.log(lines);