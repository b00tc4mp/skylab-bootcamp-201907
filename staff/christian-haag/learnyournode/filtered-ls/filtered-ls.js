const fs = require('fs')
const path = require('path')

const { argv: [, , folder, ext] } = process

fs.readdir(folder, (error, list) => {
    if (error) error
    list.forEach(function (file) {
        if (path.extname(file) === '.' + ext) {
            console.log(file)
        }

    })
})

























