/**
 * This problem is the same as the previous but introduces the concept of  
   modules. You will need to create two files to solve this.
 */


const filterFiles = require('./file-filter')
const { argv: [,, folder, extension] } = process


filterFiles(folder,extension,(error, files) => {
    if(error) return console.error('There was an error:', error)
    files.forEach(file => console.log(file))
}
)
