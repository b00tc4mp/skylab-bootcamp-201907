var fs = require('fs')

  fs.readFile(process.argv[2], 'utf8', function lines(file){
    var res = file.split('\n')
    console.log(res.length-1)
  })