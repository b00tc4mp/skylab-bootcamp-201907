function extensionsFilter(routeFile, routeExt, callback) {
    const fs = require('fs')
    const path = require('path')
    
    const extension = `.${ext}`
    
    fs.readdir(files, calback => {
        if (error) throw new Error(error)
        const result = data.filter(file => path.extname(file) === extension)
        result.forEach(file => console.log(file))
    })
}

module.exports = extensionsFilter