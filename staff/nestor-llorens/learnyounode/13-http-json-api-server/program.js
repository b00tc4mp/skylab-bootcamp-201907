const http = require('http')
let url = require('url')

const normalTime = time => {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

const unixTime = time => {
    return {
        unixtime: time.getTime()
    }
}

const parseTime = url => {
    switch (url.pathname) {

        case '/api/parsetime':
            return normalTime(new Date(url.query.iso))

        case '/api/unixtime':
            return unixTime(new Date(url.query.iso))
    }
}



const server = http.createServer((req, res) => {

    (req.method === 'GET') && res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    
    url = url.parse(req.url, true)
    res.end(JSON.stringify(parseTime(url)))

})
server.listen(process.argv[2])