const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function(error,content) {
    if (error) throw Error(error)
    console.log(content.split('\n').length-1)
})






