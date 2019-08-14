const fs = require('fs')

fs.readdir(process.argv[2], (error, list)=>{
    if (error) console.log(error)
    const result = list.filter(lists=>lists.includes('.' + process.argv[3]))
    result.forEach((element)=>{
        console.log(element)
    })

})

/* var fs = require('fs')
var path = require('path')

var folder = process.argv[2]
var ext = '.' + process.argv[3]

fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
}) */

