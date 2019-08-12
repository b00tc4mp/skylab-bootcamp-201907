var fs = require('fs')
var path = require('path');
let temp

const { argv: [,,directory,ext] } = process

fs.readdir(directory, (error, list) => {

    if (error) throw Error(error)
    list.forEach( (item) => {
        temp = path.extname(item)
        if (temp === `.${ext}`) console.log(item)
    })
})
