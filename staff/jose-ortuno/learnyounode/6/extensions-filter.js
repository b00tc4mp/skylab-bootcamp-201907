module.exports = function (pathFile, pathExt, callback) {
    const fs = require('fs')
    const path = require('path')

    const extension = `.${pathExt}`

    fs.readdir(pathFile, (error, data) => {
        if (error) return callback(error, undefined)

        const result = data.filter(file => path.extname(file) === extension)
        
        callback(undefined, result)

    })
}