const fs = require('fs')
const http = require('http')

const {argv: [, , port, file]} = process

const server = http.createServer((req, res) => {
    const { pathname, query} = url.parse(req.url, true)
    switch (pathname) {
        case '/api/parsetime':
        const date = new Date (iso)

        const hour = date.getHours()
        const minute = date.getMinutes()
        const second= date.getSeconds()

        const output = {hour, minute, second}

        const json = JSON.stringify(output)

        break

        case 'api/unixtime':

    }    
})