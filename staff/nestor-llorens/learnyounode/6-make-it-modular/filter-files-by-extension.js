const fs = require('fs')
const path = require('path')

function filterFilesByExtension (directory, ext, callback) {
    fs.readdir(directory, (error, list) => {

        if (error) return callback(error)

        const filtered = list.filter(item => path.extname(item) === `.${ext}` )
        
        callback(undefined, filtered)
    })
}

module.exports = filterFilesByExtension
