// node index-async-each-series.js http://google.it http://google.es http://google.fr http://google.ro http://google.de http://google.be

const http = require('http')
const async = require('async')

const { argv: [, , ...urls] } = process

async.eachSeries(urls, (url, callback) => {
    const request = http.get(url, response => {
        let content = ''

        response.setEncoding('utf8')

        response.on('error', error => callback(error))

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            console.log(content)

            callback()
        })
    })

    request.on('error', error => callback(error))
})
