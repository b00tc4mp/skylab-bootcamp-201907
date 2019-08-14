
const filterFilesByExtension = require('./index')

const { argv: [, , folder, extension] } = process

filterFilesByExtension(folder, extension, (error, files) => {
    if (error) throw error

    files.forEach(file => console.log(file))
})




// const filterByExtension = require('./index.js') 

// const { argv: [,, folder, extension]} = process //destructuring del process.argv

// // const folder = process.argv[2]
// // const ext = '.' + process.argv[3]

// filterByExtension(folder, extension, (error, files) => {
//   if(error) throw error
  
//   files.forEach(file => console.log(file))})
