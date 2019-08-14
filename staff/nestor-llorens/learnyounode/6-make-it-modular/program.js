const filterFilesByExtension = require('./filter-files-by-extension.js')

const {argv: [,,directory, extension] } = process

filterFilesByExtension(directory, extension, (error, files) => {
    if (error) throw Error(error)

    files.forEach(item => console.log(item))
})