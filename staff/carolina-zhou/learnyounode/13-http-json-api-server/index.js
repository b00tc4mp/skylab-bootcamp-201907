// SOLUTION A:

// Assigning the http and url modules to the variables http and url. 
const http = require('http')
const url = require('url')

// Assigning the first argument to the variable port.
const { argv: [, , port] } = process
 
// Function to parse an iso time string and return the hour, minute, and second as a JSON object. By returning an object in JavaScript object notation format, it is easy to convert the results of my function to JSON format with the JSON.stringify() method.
parsetime = (time) => {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

// Function which accepts an iso time string and returns a JSON object with the unix epoch conversion of the iso string.
unixtime = (time) => {
  return { unixtime : time.getTime() }
}
 
// Creating a server. 
const server = http.createServer((req, res) => {
   //  url.parse(request.url, true) will parse content of request.url and provide an object with helpful properties.
  const parsedUrl = url.parse(req.url, true)
  // The JavaScript Date object can print dates in ISO format, e.g. new Date().toISOString(). It can also parse this format if you pass the string into the Date constructor.
  const time = new Date(parsedUrl.query.iso)
  let result
 
  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)
 
  if (result) {
     // writing status 200 and and the content type, which is application/json.
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(port)) // Listening on the port that is passed as the first argument.




// SOLUTION B: 

const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    const { pathname, query: { iso } } = url.parse(req.url, true)

    const date = new Date(iso)
    let output, json

    switch (pathname) {
        case '/api/parsetime':
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            output = { hour, minute, second }

            json = JSON.stringify(output)

            res.writeHead(200, {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*', // AVOID cors problems
                // 'Access-Control-Allow-Origin': 'https://www.google.es' // LIMIT access to localhost and google only
            })

            res.end(json)
            break
            
        case '/api/unixtime':
            const unixtime = date.getTime()

            output = { unixtime }

            json = JSON.stringify(output)

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
    }
})
server.listen(port)  