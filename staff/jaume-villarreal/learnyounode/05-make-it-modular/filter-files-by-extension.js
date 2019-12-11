const fs = require('fs')
var path = require ('path')

function filterByExtension (folder , extension , callback) {
    fs.readdir(folder , (error , files) => {
        if (error) return callback(error)

        const filtered = files.filter( file => (path.extname(file) === `.${extension}`))

        callback(undefined , filtered)
    })
}

module.exports = filterByExtension


