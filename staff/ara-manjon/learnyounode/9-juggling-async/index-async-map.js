const http = require('http')
const async = require('async')
const { argv: [, , ...urls] } = process

async.map(urls, (url, callback) => {
   let content = ''
   const request = http.get(url, response => {
       response.setEncoding('utf8')
       response.on('error', error => callback(error))
       response.on('data', chunk => content += chunk)
       response.on('end', () => callback(undefined, content))
   })
   request.on('error', error => callback(error))
}, (error, contents) => {
   debugger
   if (error) throw error
   contents.forEach(content => console.log(content))
})