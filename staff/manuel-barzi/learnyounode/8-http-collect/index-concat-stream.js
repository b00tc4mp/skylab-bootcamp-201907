const http = require('http')
const cs = require('concat-stream')

const { argv: [, , url] } = process

const request = http.get(url, response => response.pipe(cs(content => console.log(`${content.length}\n${content}`))))

request.on('error', error => { throw error })