var fs = require('fs')

const file = process.argv[2].toString()

fs.readFile( file , (error , expression) => {
    if(error) throw Error (error)
    else countLines(file)
})

const countLines = file => {
    const lines = file.split('\n')
    console.log (lines.length-1)
}