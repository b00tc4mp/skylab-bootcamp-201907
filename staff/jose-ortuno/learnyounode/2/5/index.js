const fs = require('fs')
const path = require('path')

const { argv: [, , files, ext] } = process

const extension = `.${ext}`


fs.readdir(files, (error, data) => {
    if (error) throw new Error(error)
    const result = data.filter(file => path.extname(file) === extension)
    result.forEach(file => console.log(file))
})