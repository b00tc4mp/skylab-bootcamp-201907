const filterFilesByExtension = require('./module')

const { argv: [, , folder, extension] } = process

filterFilesByExtension(folder, extension, (error, files) => {
    if (error) throw error

    files.forEach(file => console.log(file))
})