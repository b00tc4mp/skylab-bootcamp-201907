var fs = require('fs')
var path = require('path')

const { argv : [,, direct, ext] } = process

  fs.readdir(direct, (error, files) => {
    if(error) throw error    
    files.forEach(file => {
      var res = path.extname(file)
      if(res === `.${ext}`){
        console.log(file)
      }
    });
  })


  