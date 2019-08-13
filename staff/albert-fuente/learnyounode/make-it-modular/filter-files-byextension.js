const fs = require('fs')
const path = require('path')

function filterFilesByExtension(folder, extension, callback) {
    fs.readdir(folder, (error, files) => {
        if (error) return callback(error)

        const _extension = `.${extension}`

        const filtered = files.filter(file => path.extname(file) === _extension)

        callback(undefined, filtered)
    })
}

module.exports = filterFilesByExtension