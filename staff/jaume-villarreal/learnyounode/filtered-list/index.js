const fs = require('fs')
var path = require ('path')

const { argv : [ , , folder , extension] } = process

fs.readdir(folder , (error , files) => {
    if (error) throw error

    files.forEach( file => {
        (path.extname(file) === `.${extension}`) && console.log (file)
    })
})