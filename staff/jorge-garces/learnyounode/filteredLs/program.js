var fs = require('fs');
var path = require('path');

const { argv: [, , dir, ext] } = process

fs.readdir(dir, function (err, list) {

    for (i = 0; i < list.length; i++) {
        if (err) return console.log(err)

        if (path.extname(list[i]) === `.${ext}`) {
            console.log(list[i]);
        } else { };
    }
});