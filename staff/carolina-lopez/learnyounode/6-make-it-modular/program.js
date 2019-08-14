var myModule = require('./mymodule.js')

const { argv : [, , dir, ext] } = process

myModule(dir, ext, (error, files) => {
  if(error) throw error
  files.forEach(file => console.log(file))
})
 