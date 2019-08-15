// node index-series.js http://google.it http://google.es http://google.fr http://google.ro http://google.de http://google.be

const http = require('http')

const { argv: [, , ...urls] } = process

//getAndPrint(urls[0], () => getAndPrint(urls[1], () => getAndPrint(urls[2], () => {}))) // BUT this has a limit... so recursion may help

recursiveGetAndPrint(urls)

function recursiveGetAndPrint(urls) {
    if (urls.length > 0)
        getAndPrint(urls[0], () => recursiveGetAndPrint(urls.slice(1)))
}


function getAndPrint(url, done) {
    let content = ''

    const request = http.get(url, response => {
        response.setEncoding('utf8')

        response.on('error', error => { throw error })

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            console.log(content)

            done()
        })
    })

    request.on('error', error => { throw error })
}
