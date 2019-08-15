const extensionsFilter = require('./extensions-filter')

const { argv: [, , files, ext] } = process

extensionsFilter(files, ext, (error, result) => {
    if (error) throw new Error(error)

    result.forEach(file => console.log(file))    
})