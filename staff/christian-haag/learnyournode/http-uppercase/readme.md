 # LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## HTTP UPPERCASERER (Exercise 12 of 13)

  Write an HTTP server that receives only POST requests and converts
  incoming POST body characters to upper-case and returns it to the client.

  Your server should listen on the port provided by the first argument to
  your program.

 ─────────────────────────────────────────────────────────────────────────────

 ## HINTS

  While you're not restricted to using the streaming capabilities of the
  request and response objects, it will be much easier if you do.

  There are a number of different packages in npm that you can use to
  "transform" stream data as it's passing through. For this exercise the
  through2-map package offers the simplest API.

  through2-map allows you to create a transform stream using only a single
  function that takes a chunk of data and returns a chunk of data. It's
  designed to work much like Array#map() but for streams:
```js
     var map = require('through2-map')
     inStream.pipe(map(function (chunk) {
       return chunk.toString().split('').reverse().join('')
     })).pipe(outStream)
```
  In the above example, the incoming data from inStream is converted to a
  String (if it isn't already), the characters are reversed and the result
  is passed through to outStream. So we've made a chunk character reverser!
  Remember though that the chunk size is determined up-stream and you have
  little control over it for incoming data.

  To install through2-map type:

     $ npm install through2-map

__________________________________________________________________________

## SOLUTION

```js
const http = require('http')
const map = require('through2-map')

const { argv: [, , port] } = process

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(response)
    } else {
        error => { throw error }
    }
})
server.listen(port)
```
### Second Approach

```js
const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        let content = ''
        request.on('data', chunk => content += chunk)
        request.on('end', () => {
            const uppercase = content.toUpperCase()

            response.end(uppercase)
        })
        request.on('error', error => { throw error })
    }
})
server.listen(port)
```