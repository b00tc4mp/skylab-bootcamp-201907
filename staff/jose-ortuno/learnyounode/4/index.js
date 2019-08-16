const fs = require('fs')
const { argv: [, , file] } = process

fs.readFile(file, 'utf8', (error, data) => {
    if(error) throw new Error(error)
    const lines = data.match(/\r?\n/g).length
    console.log(lines)
})

