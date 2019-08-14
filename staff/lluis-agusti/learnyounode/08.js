const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

const request = http.get(url, response => {
    response.pipe(bl((error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    }))
})

request.on('error', error => { throw error })