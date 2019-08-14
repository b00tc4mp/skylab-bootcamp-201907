const http = require('http')
const url = require('url')

const { argv: [, , port] } = process
debugger
const server = http.createServer((req, res) => {
    const { pathname, query: { iso } } = url.parse(req.url, true)
    debugger
    const date = new Date(iso)
    let output, json

    switch (pathname) {
        // TEST curl http://localhost:8080/api/parsetime?iso=2013-08-10T12:10:15.474Z 
        case '/api/parsetime':
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            output = { hour, minute, second }

            json = JSON.stringify(output)


            res.writeHead(200, {
                'Content-Type': 'application/json',
            })

          
            res.end(json)

            break
        // TEST curl http://localhost:8080/api/unixtime?iso=2013-08-10T12:10:15.474Z 
        case '/api/unixtime':
            const unixtime = date.getTime()

            output = { unixtime }

            json = JSON.stringify(output)

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
    }
})

server.listen(port)  