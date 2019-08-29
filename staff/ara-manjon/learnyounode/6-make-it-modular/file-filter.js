/**
 * You must write a module file to do most of the work. The module must  
  export a single function that takes three arguments: the directory name,  
  the filename extension string and a callback function, in that order. The  
  filename extension argument must be the same as what was passed to your  
  program. Don't turn it into a RegExp or prefix with "." or do anything  
  except pass it to your module where you can do what you need to make your  
  filter work.

  The callback function must be called using the idiomatic node(err, data)  
  convention. This convention stipulates that unless there's an error, the  
  first argument passed to the callback will be null, and the second will be  
  your data. In this exercise, the data will be your filtered list of files,  
  as an Array. If you receive an error, e.g. from your call to  
  fs.readdir(), the callback must be called with the error, and only the  
  error, as the first argument.
 */

const fs = require('fs')
const path = require('path')

function filterFiles(dir, ext, callback){
fs.readdir(dir, (err,data)=>{
    if(err) return callback(err)
    const filtered= data.filter(file => (path.extname(file) === '.'+ext))
    callback(undefined, filtered)
})}

module.exports=filterFiles











/* 
const fs = require('fs')
const path = require('path') 

function filterFilesByExtension(folder, extension, callback){
fs.readdir(folder, (err, files)=>{
    if(err) return callback(err)
    

    const filtered = files.filter(file => (path.extname(file) === `.${extension}`))
     
    callback(undefined,filtered)
})
}

module.exports=filterFilesByExtension */


