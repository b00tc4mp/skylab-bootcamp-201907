
//node . . txt 
const filterModul = require('./file-filter-by-extension')
const { argv: [,, folder, extension] } = process


filterModul(folder,extension,(error, files) => {
    if(error) return error
    files.forEach(file => console.log(file))
}
)
