const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    const { pathname, query: { iso } } = url.parse(req.url, true)

    switch (pathname) {
        case '/api/parsetime':
            const date = new Date(iso)

            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            const output = { hour, minute, second }

            const json = JSON.stringify(output)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(json)

            break
        case '/api/unixtime':
            const time = new Date(iso)

            const unixtime = time.getTime()

            const result = { unixtime }

            const jaison = JSON.stringify(result)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(jaison)


    }
})
server.listen(port)
