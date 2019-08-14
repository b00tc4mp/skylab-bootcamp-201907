
//node . . txt 
const filterFilesByExtension = require('./file-filter-by-extension')
const { argv: [,, folder, extension] } = process


filterFilesByExtension(folder,extension,(error, files) => {
    if(error) return error
    files.forEach(file => console.log(file))
}
)
