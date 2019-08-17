/**
 * Write a program that accepts one or more numbers as command-line arguments  
   and prints the sum of those numbers to the console (stdout). 
   
   You can access command-line arguments via the global process object. The  
   process object has an argv property which is an array containing the  
   complete command-line. i.e. process.argv

   In which case the output would be an array looking something like:  
   
   [ 'node', '/path/to/your/program.js', '1', '2', '3' ] 
 */

 
console.log(process.argv.slice(2).reduce((acc, val)=> acc + Number(val), 0))
