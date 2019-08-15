const fs = require('fs')
const path = require('path')

const { argv: [, , files, ext] } = process

const extension = `.${ext}`


fs.readdir(files, (error, data) => {
    if (error) throw new Error(error)
    console.log(data)
    const result = data.filter(file => file === extension)
    console.log(result)
})