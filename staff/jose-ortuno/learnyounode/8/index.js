const http = require('http')

const { argv: [, , url] } = process

http.get(url, response => {
    let content = ''
    response.setEncoding('utf8')
    response.on('error', error => { throw error })
    response.on('data', data => content += data)
    response.on('end', () => {
        console.log(content.length)
        console.log(content)
    })
}).on('error', error => { throw error })
