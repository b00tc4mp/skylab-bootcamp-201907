var fs = require('fs')

const { argv : [ , , file] } = process

fs.readFile( file , 'utf-8' , (error , data) => {
    if(error) throw Error (error)
    countLines(data) 
})

const countLines = (content) => {
    const BREAK_REGEX = /\r?\n/g
        const lines = content.match(BREAK_REGEX).length
        console.log(lines);
}
    