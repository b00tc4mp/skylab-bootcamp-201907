var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function (err, content) {
    console.log(content.split('\n').length - 1);
});
