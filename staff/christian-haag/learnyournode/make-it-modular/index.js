const filterByExt = require('./module.js')

const { argv: [, , folder, ext] } = process

filterByExt(folder, ext, files => files.forEach(file => console.log(file)))