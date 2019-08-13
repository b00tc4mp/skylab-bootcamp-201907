const fs = require('fs');
const content = fs.readFileSync(process.argv[2]) ;

/* const lines = content.toString().split('\n').length - 1; */
// alternative to the use of split method:
const lines = content.match(/\r?\n/g).length

console.log(lines)