/*
 ## FILTERED LS (Exercise 5 of 13)

Create a program that prints a list of files in a given directory,
filtered by the extension of the files. You will be provided a directory
name as the first argument to your program (e.g. '/path/to/dir/') and a
file extension to filter by as the second argument.

For example, if you get 'txt' as the second argument then you will need to
filter the list to only files that end with .txt. Note that the second
argument will not come prefixed with a '.'.

Keep in mind that the first arguments of your program are not the first
values of the process.argv array, as the first two values are reserved for
system info by Node.

The list of files should be printed to the console, one file per line. You
must use asynchronous I/O.

 ─────────────────────────────────────────────────────────────────────────────

 ## HINTS

  The fs.readdir() method takes a pathname as its first argument and a
  callback as its second. The callback signature is:
*/
// function callback (err, list) { /* ... */ }
/*
where list is an array of filename strings.

You may also find node's path module helpful, particularly the extname
method.
*/

const fs = require ('fs') 
const path = require ('path')

const {argv:[,,folder, extension]} = process

const _extension = `.${extension}`

fs.readdir(folder,(error, files) => {   // Asynchronous readdir(3). Reads the contents of a directory. 
                                        // The callback gets two arguments (err, files) where files is an array of the names 
                                        // of the files in the directory excluding '.' and '..'.
    if (error) throw error

    files.forEach(file => {
        path.extname(file) === _extension && console.log(file)  //The path.extname() method returns the extension of the path, from the last occurrence of the .
    })
})