const http = require('http')
const url = require('url')

const { argv: [,,port] } = process

const server = http.createServer((req, resp) => {
    if (req.method === 'GET') {
        const urlParsed = url.parse(req.url, true) 
        const iso = urlParsed.query.iso 
        const isoDate = new Date(iso)
        if (urlParsed.pathname === '/api/parsetime') {
           const jsonData = {
               "hour": Number(('0' + isoDate.getHours()).slice(-2)),
               "minute": Number(('0' + isoDate.getMinutes()).slice(-2)),
               "second": Number(('0' + isoDate.getSeconds()).slice(-2)),
           }
            resp.setHeader('Content-Type', 'application/json')
            resp.end(JSON.stringify(jsonData))
        } else if (urlParsed.pathname === '/api/unixtime') {
            const unixEpoch = isoDate.getTime()
            const jsonData = {"unixtime": unixEpoch }
            resp.setHeader('Content-Type', 'application/json')
            resp.end(JSON.stringify(jsonData))

        }
    }
})

server.listen(port)