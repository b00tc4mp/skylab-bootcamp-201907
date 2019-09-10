/*
## HTTP JSON API SERVER (Exercise 13 of 13)

  Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.

 ─────────────────────────────────────────────────────────────────────────────

 ## HINTS

  The request object from an HTTP server has a url property that you will
  need to use to "route" your requests for the two endpoints.

  You can parse the URL and query string using the Node core 'url' module.
  url.parse(request.url, true) will parse content of request.url and provide
  you with an object with helpful properties.

  For example, on the command prompt, type:

     $ node -pe "require('url').parse('/test?q=1', true)"

  Your response should be in a JSON string format. Look at JSON.stringify()
  for more information.

  You should also be a good web citizen and set the Content-Type properly:

     res.writeHead(200, { 'Content-Type': 'application/json' })

  The JavaScript Date object can print dates in ISO format, e.g. new
  Date().toISOString(). It can also parse this format if you pass the string
  into the Date constructor. Date.getTime() will also come in handy.
*/
/*
const http = require ('http')
const url = require ('url')

const {argv: [, , port]} = process

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const urlParsed = url.parse(request.url, true)
        // takes a URL string, parses it, and returns a URL object.
        const iso = urlParsed.query.iso
        const isoDate = new Date (iso)

        if (urlParsed.pathname === '/api/parsetime') {
            const jsonData = {
                "hour": Number(('0' + isoDate.getHours()).slice(-2)),
                "minute": Number(('0' + isoDate.getMinutes()).slice(-2)),
                "second": Number(('0' + isoDate.getSeconds()).slice(-2))
            }
            response.setHeader('content-type', 'application/json')
            response.end(JSON.stringify(jsonData))
        }else if (urlParsed.pathname === '/unixtime') {
            const unixData = isoDate.getTime()  //convert to unixTime
            const jsonData = {"unixTime": unixData}
            response.setHeader('content-type', 'application-json')
            response.end(JSON.stringify(jsonData))
        }
    }
    
}).listen(port)
*/

/**
 *      SKYLAB VERSION
 */
/*
 // TEST curl http://localhost:8080/api/parsetime?iso=2013-08-10T12:10:15.474Z 
const http = require ('http')
const url = require ('url')

const {argv:[, , port]} = process

const server = http.createServer((req, res) => {
    const {pathname, qurey: {iso}} = url.parse(req.url, true)

    const date = new Date(iso)
    let output, json

    switch (pathname) {
// TEST curl http://localhost:8080/api/parsetime?iso=2013-08-10T12:10:15.474Z 
        case '/api/parsetime':
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            output = (hour, minute, second)
            json = JSON.stringify(output)

            res.writeHead (200, {'content-type': 'application/json',})
            res.end (json)
            break
        case '/api/unixtime':
            const unixTime = date.getTime()

            output = {unixTime}
            json = JSON.stringify(output)

            res.writeHead(200, {'content-type':'application/json'})
            res.end(json)
    }
})
*/

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

/**
 *  OFICIAL VERSION
 */
/*
var http = require('http')
var url = require('url')

function parsetime (time) {
    return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
    }
}

function unixtime (time) {
    return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
    } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
    }

    if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
    } else {
    res.writeHead(404)
    res.end()
    }
})
server.listen(Number(process.argv[2]))
*/