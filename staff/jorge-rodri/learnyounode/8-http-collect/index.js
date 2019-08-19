var http = require('http')
var bl = require('bl')//bufferList

const {argv: [, ,url] } = process

http.get(url,response => {
    response.pipe(bl((error, data)=>{
        if(error) return console.log(error)
        data = data.toString()
        console.log(data.length)
        console.log(data)

    }))
})