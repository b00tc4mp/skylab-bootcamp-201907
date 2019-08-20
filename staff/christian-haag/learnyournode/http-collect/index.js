const bl = require('bl')
const http = require('http')

const { argv: [, , url] } = process

http.get(url, response => {
    response.pipe(bl((error, data) => {
        if (error) throw error
        data = data.toString()
        console.log(data.length)
        console.log(data)
    }))
})



/*--------learnyounode----------
var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
    response.pipe(bl(function (err, data) {
        if (err) {
            return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
    }))
})
*/
