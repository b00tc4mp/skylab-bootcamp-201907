var mymodule = require('./mymodule.js')

const { argv : [,, dir, ext] } = process

mymodule(dir, ext, files => files.forEach(file => console.log(file)))
 