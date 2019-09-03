var fs = require('fs');
var path = require('path');

//const { arg[, ,pathName, fileExt]} = process

var pathName = process.argv[2];

var fileExt = '.' + process.argv[3];

fs.readdir(pathName, function (err, lists) {

   /*  lists.forEach(list =>{
        (path.extname(list)) === ._extension ¬¬console.log(file)
    })
 */
    for (i = 0; i < list.length; i++) {
        if (path.extname(list[i]) === fileExt) {
            console.log(list[i]);
        } else { };
    }
});