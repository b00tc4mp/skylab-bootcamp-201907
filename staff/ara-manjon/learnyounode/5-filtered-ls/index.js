/**
 *  Create a program that prints a list of files in a given directory,  
    filtered by the extension of the files. You will be provided a directory  
    name as the first argument to your program (e.g. '/path/to/dir/') and a  
    file extension to filter by as the second argument.

    The fs.readdir() method takes a pathname as its first argument and a  
    callback as its second. The callback signature is:  
   
     function callback (err, list)
 */

 const file =  process.argv[2]
 const extension = '.'+ process.argv[3]
 const fs = require('fs')
 const path = require('path')

 fs.readdir(file, (error, list)=>{
    if(error) throw error

    const filter = list.filter(file => path.extname(file) === extension)
    for(const i= 0; i< filter.length; i++)
    console.log(filter[i])

 })





