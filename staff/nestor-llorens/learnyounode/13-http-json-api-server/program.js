const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const parsedPath = url.parse(req.url, true)
    const parsedQuery = url.parse(req.url, true)

    

})
server.listen(process.argv[2])