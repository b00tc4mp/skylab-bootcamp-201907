/**
 * Write a program that uses a single synchronous filesystem operation to  
   read a file and print the number of newlines (\n) it contains to the  
   console (stdout).

   To perform a filesystem operation you are going to need the fs module from  
   the Node core library. To load this kind of module, or any other "global"  
   module, use the following incantation:  
   
     var fs = require('fs') 

   To read a file, you'll need to use  
   fs.readFileSync('/path/to/file'). This method will return a Buffer object  
   containing the complete contents of the file. 
 */


const fs = require('fs')

const file= fs.readFileSync(process.argv[2])

const fileString= file.toString()


console.log(fileString.split('\n').length -1 )





