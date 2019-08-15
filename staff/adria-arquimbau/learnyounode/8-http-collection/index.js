var http = require('http')
var bl = require('bl')


const { argv: [ , ,url] } = process

const request = http.get(url, response => {
  response.pipe(bl((error, content) => {
    if(error) throw error
      console.log(content.length)
      console.log(content.toString())

      //console.log(`${content.length}\n${content}`)  
  }))
})

request.on('error', error => {throw error})

//podemos generar una const "request" y invocarla abajo con el on error general
