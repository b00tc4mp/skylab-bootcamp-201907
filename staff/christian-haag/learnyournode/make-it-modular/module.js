const fs = require('fs')
const path = require('path')

function filterFilesByExtension(folder, ext, callback) {

    fs.readdir(folder, (error, list) => {
        if (error) return callback(error)

        const filtered = list.filter(file => path.extname(file) === `.${ext}` && filtered.push(file))

        callback(undefined, filtered)
    })
}

module.export = filterFilesByExtension

