var fs = require('fs')

const { argv: [, , file] } = process

fs.readFile(file, 'utf-8', (error, content) => {
    if (error) throw error

    const lines = content.match(/\r?\n/g).length

    console.log(lines)
})







