const http = require('http')

const { argv: [, , url] } = process

http.get(url, response => {
    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    response.on('data', content => console.log(content))
})
    .on('error', error => { throw error })