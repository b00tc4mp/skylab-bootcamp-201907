// The difference between this program and the third one (my-first-io) lies on the subject sync vs async.
var fs = require('fs');

fs.readFile(process.argv[2], function(error, content) {
    if (error) throw error
    /* var lines = content.toString().split('\n').length - 1; */
    // alternative to the use of split method:
    const lines = content.match(/\r?\n/g).length
    console.log(lines)
})