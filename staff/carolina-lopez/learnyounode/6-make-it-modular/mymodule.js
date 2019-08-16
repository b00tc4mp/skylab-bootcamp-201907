const fs = require('fs')
const path = require('path')

function myModule(folder, ext, callback){
  fs.readdir(folder, (error, files) => {
    if(error) return callback(error)
    
    const _ext = `.${ext}`

    const filtered = files.filter(file => path.extname(file) === _ext)

    callback(undefined, filtered)
  })
}

module.exports =  myModule