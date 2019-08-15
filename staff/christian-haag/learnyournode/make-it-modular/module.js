const fs = require('fs')
const path = require('path')

function filterFilesByExtension(folder, ext, callback) {

    fs.readdir(folder, (error, list) => {
        if (error) return callback(error)

        const filtered = list.filter(file => path.extname(file) === `.${ext}`)

        callback(undefined, filtered)
    })
}

module.exports = filterFilesByExtension


//--------------learnyounode-----solution------------------------------------
/*
var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]

    filterFn(dir, filterStr, function (err, list) {
      if (err) {
        return console.error('There was an error:', err)
      }

      list.forEach(function (file) {
        console.log(file)
      })
    })
 */

