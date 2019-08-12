const fs = require('fs')
const path = require('path') 

function filterFilesByExtension(folder, extension, callback){
fs.readdir(folder, function(err, files){
    if(err) return callback(err)

    const filtered = files.filter(file => (path.extname(file) === `.${extension}`))
     
    callback(undefined,filtered)
})
}

module.exports=filterFilesByExtension


