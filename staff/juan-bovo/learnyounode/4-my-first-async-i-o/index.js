var fs = require('fs')

var buf = fs.readFile(process.argv[2], 'utf8', (err,data) => {
    var content = data.toString().match(/\r?\n/g).length
    console.log(content)

})

