const fs = require('fs')
const path = require('path');

const { argv: [,,directory,ext] } = process

fs.readdir(directory, (error, list) => {

    if (error) throw Error(error)

    const filtered = list.filter(item => path.extname(item) === `.${ext}` )
    
    filtered.forEach(item => console.log(item))
})
