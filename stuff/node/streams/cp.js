const fs = require('fs')

// node . from-file-path to-file-path

const { argv: [, , from, to] } = process

fs.readFile(from, (error, data) => {
    if (error) throw error

    fs.writeFile(to, data, error => {
        if (error) throw error

        console.log(process.memoryUsage())
    })
})