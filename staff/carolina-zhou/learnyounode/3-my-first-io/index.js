const fs = require('fs');
const content = fs.readFileSync(process.argv[2], 'utf8') ;

// Option A:
/* const lines = content.toString().split('\n').length - 1; */

// Option B (alternative to the use of split method)
const lines = content.match(/\r?\n/g).length

console.log(lines)