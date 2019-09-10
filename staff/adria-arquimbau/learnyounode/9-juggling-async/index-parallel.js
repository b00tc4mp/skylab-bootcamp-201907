// node index.js http://google.it http://google.es http://google.fr http://google.ro http://google.de http://google.be

const http = require('http')

const { argv: [, , ...urls] } = process

const responses = new Array(urls.length).fill('')

let count = 1

urls.forEach((url, index) => {
    const request = http.get(url, response => {
        response.setEncoding('utf8')

        response.on('error', error => { throw error })

        response.on('data', chunk => responses[index] += chunk)

        response.on('end', () => {
            if (count === urls.length)
                responses.forEach(content => console.log(content))
            else count++
        })
    })

    request.on('error', error => { throw error })
})