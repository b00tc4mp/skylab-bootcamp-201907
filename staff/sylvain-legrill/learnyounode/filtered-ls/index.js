const fs = require('fs')
const path = require('path')

const { argv: [, , folder, extension] } = process

const _extension = `.${extension}`

fs.readdir(folder, (error, files) => {
    if (error) throw error

    files.forEach(file => {
        path.extname(file) === _extension && console.log(file)
    })
})

 //extname extrae el file