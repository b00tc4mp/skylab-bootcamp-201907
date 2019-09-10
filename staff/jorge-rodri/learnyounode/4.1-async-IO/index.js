const fs = require('fs')
const re = /\r?\n/g
const { argv: [, , path] } = process

const result = fs.readFile(path,'ascii', (error, data) => {
    if(error) throw Error
    const file = (data.toString()).match(re)
    console.log(file.length)
})

