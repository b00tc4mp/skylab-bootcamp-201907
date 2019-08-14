const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

http.get(url, response => {

    response.pipe(bl((error, content) => {

        if (error) throw error

        console.log(content.toString().length)
        console.log(content.toString())
    }))
})