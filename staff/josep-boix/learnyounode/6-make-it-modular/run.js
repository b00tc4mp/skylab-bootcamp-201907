const filterFuncByExtension = require ('./index')
const {argv: [, , folder, extension] } = process

filterFuncByExtension(folder, extension, (error, data) => {
    if (error) console.error(error)

    data.forEach(_data => console.log(_data))
})