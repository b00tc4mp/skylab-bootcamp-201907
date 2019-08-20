const http = require('http')
const { argv: [, , ...urls] } = process


let content = []
let count = 0
urls.forEach((url, index) => {
    let fullChunk = ''
    http.get(url, response => {
        response.setEncoding('utf8')
        response.on('data', chunk => fullChunk += chunk)
        response.on('end', () => {
            content[index] = fullChunk
            count++

            if(count === urls.length) content.forEach(value => console.log(value))
        })
    })
})

