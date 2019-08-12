// var fs = require('fs')
// var buf = fs.readFile(fs.readdir(process.argv[2]), path.extname(process.argv[3]), (err, list) => {
//     list.forEach( data => console.log(data.toString()))
// })

var fs = require('fs')
const path = require('path')

//const { argv: [,, folder, extension]} = process //FYI: process es un objeto, argv es un array //--> Reestructurado en las próximas dos líneas, aunque no fue llamado así.
// const folder = process.argv[2] //--> llamado directamente desde la función
// const extension = process.argv[3] //--> llamado directamente desde la callback

// const _extension = `.${extension}` //--> llamado directamente desde la callback

fs.readdir(process.argv[2], (error, files) => {
    if(error) throw error

    files.forEach(file => {
        path.extname(file) === `.${process.argv[3]}` && console.log(file) // --> path.extname(archivo) lo devuelve con punto, PERO el ejercicio de learnyounode lo devuelve SIN... por eso hay que agregarlo con el template literal.
    })

})