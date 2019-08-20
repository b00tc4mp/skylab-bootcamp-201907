const fs = require('fs')

const {argv: [,,path]} = process

function countLine(){
    const arr = fs.readFileSync(path) 
    const str=arr.toString()
    return str.split('\n').length
}
console.log(countLine()-1)