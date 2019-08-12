var fs = require('fs')

const {argv : [ , , file]} = process

fs.readFile( file , (error , data) => {
    if(error) throw Error (error)
    else{
        // countLines(data)
        const BREAK_REGEX = /\r?\n/g
        const lines = data.match(BREAK_REGEX).length
        console.log(lines);
    }
})

// const countLines = (content) => {
//     const BREAK_REGEX = /\r?\n/g
//         const lines = data.match(BREAK_REGEX).length
//         console.log(lines);
// }
    