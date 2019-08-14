
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

// var fs = require("fs")
// var path = require('path')

// var filepath = process.argv[2]
// var fileExt = "." + process.argv[3]

// module.exports = function getFile (filepath, fileExt, callback) {

//     fs.readdir(filepath, function(err, arg){
//         if(err) callback(err)
        
//         arg = arg.filter((arg) => {
//             return path.extname(arg) === fileExt
//         })
//         callback(null, arg)
//     })
// }

// getFile(filepath, fileExt, (err, arg) =>{
//     if(err) throw error
//     arg.forEach(function (arg) {
//             console.log(arg)
//     })  
// })




// const fs = require('fs') //et diu el archiu que estas treballant
// const path = require('path') //et diu la extensio dela rchiu que vols

// function filterFilesByExtension(folder, extension, callback) {

//     fs.readdir(folder, (err, files) => { /**readdir es per cridar si es async o sinc */

//         if (err) callback(error)

//         const filtered = []

//         files.forEach((file) => {
//             (path.extname(file) === `.${extension}`) && filtered.push(file)  //extname extreu el path del archiu, pero amb el '.'
//         })

//         callback(undefined, filtered)
//       })
// }

// module.exports = filterFilesByExtension


