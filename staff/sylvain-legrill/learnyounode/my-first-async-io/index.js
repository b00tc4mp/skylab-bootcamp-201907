const fs = require('fs')

const {argc: [, , file] } = process 

fs.readFile(file,'utf8',(err,content) => {
   if (error) throw error 
   const lines = constent.match(/\r?\n/g).length

   console.log(lines)


})

console.log( '...')


