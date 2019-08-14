// http core module passed to a variable
const http = require('http')
/* url provided is the first command-line argument
const url = process.argv[2] */
const { argv: [, , url] } = process

// http.get() method with url as first argument and callback as second.
// response is a Node Sream object (an object that emits events: "data", "error", "end"...)
// setEncoding method is used so that the following "data" and "error" events emit Strings rather than the standard Buffer objects.
http.get(url, function callback(response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)    
}).on('error', console.error) /*for connexion errors*/