// The difference between this program and the third one (my-first-io) lies on the subject sync vs async.
var fs = require('fs');

const { argv: [, , file] } = process

fs.readFile(/* process.argv[2] */file, 'utf8', (error, content) => {
    if (error) throw error

    /* const lines = content.toString().split('\n').length - 1; */
    const lines = content.match(/\r?\n/g).length
    console.log(lines)
})