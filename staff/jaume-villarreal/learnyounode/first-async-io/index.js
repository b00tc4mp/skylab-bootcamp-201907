var fs = require('fs')

const file = process.argv[2].toString()

const readFile = expression => {
    fs.readFile( file , (error , data) => {
        if(error) throw Error (error)
        else expression(file)
})
}

readFile(countLines)

const countLines = file => {
    const lines = file.split('\n')
    console.log (lines.length-1)
}