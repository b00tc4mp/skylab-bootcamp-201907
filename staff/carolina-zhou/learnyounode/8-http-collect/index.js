// http core module passed to a variable
const http = require('http')
// Buffer list
const bl = require('bl')
/* url provided is the first command-line argument
const url = process.argv[2] */
const { argv: [,,url]} = process
 
http.get(url, (response) => {
  response.pipe(bl((err, data) => {
    if (err) throw error
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})


// Without bl:
/* 
const http = require('http')

const { argv: [, , url] } = process

const request = http.get(url, response => {
    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    let content = ''
    response.on('data', chunk => content += chunk)
    response.on('end', () => console.log(`${content.length}\n${content}`))

    // NOTE about the data progression
    // let count = 0
    // response.on('data', () => count++)
    // response.on('end', () => console.log(count))
})
request.on('error', error => { throw error }) 
*/