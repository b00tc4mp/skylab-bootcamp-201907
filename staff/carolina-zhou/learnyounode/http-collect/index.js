// http core module passed to a variable
const http = require('http')
// Buffer list
const bl = require('bl')
/* url provided is the first command-line argument
const url = process.argv[2] */
const { argv: [,,url]} = process
 
http.get(url, (response) => {
  response.pipe(bl((err, data) => {
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})