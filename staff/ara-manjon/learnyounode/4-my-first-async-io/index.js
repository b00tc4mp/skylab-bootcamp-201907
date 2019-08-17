/**
 * Write a program that uses a single asynchronous filesystem operation to  
   read a file and print the number of newlines it contains to the console  
   (stdout).

   Will want to use fs.readFile() and  
   instead of using the return value of this method you need to collect the  
   value from a callback function that you pass in as the second argument.

   function callback (err, data)
   
   you can supply  
   'utf8' as the second argument and put the callback as the third argument  
   and you will get a String instead of a Buffer
 */

 
const fs = require('fs')

const file = process.argv[2]

fs.readFile(file, 'utf8', (error, data) => {
    if(error) throw error
    const lines = data.match(/\r?\n/g).length //regex para introducir saltos de línia
    console.log(lines)
})
