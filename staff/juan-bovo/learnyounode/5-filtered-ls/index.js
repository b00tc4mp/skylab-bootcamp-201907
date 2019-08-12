var fs = require('fs')
// var buf = fs.readFile(fs.readdir(process.argv[2]), path.extname(process.argv[3]), (err, list) => {
//     list.forEach( data => console.log(data.toString()))
// })
const path = require('path')

const { argv: [,, folder, extension]} = process //process es un objeto, argv es un array

fs.readdir(folder, (error, files) => {
    if(error) throw error

    files.forEach(file => {
        if(path.extname(file) === //No pude ni copiarlo! ¬________¬  )
    })


})