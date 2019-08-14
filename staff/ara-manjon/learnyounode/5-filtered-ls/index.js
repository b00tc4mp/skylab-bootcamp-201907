//print a list of files ina given dictionary

const fs = require('fs')
const path = require('path') //devuelve la extension del archivo
const { argv: [,, folder, extension] } = process


fs.readdir(folder, function(err, list){
    if(err) throw err
    for(i=0; i<list.length; i++){
        if(path.extname(list[i]) === `.${extension}`) console.log(list[i])    
    }
})


