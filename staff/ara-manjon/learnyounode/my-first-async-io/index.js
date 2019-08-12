/* var fs= require('fs')
var file= process.argv[2]

fs.readdir(file, function(err, lsit){
console.log(list.toString().split('\n').length)
} */
var fs= require('fs')
const { argv: [,, file] } = process
const content = fs.readFile(file, 'utf8', (error, content)=>{
    if(error) throw error
    const lines = content.match(/\r?n/g).length
    console.log(lines)
})