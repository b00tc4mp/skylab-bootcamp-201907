const http = require('http')
var bl = require('bl')

const url =  process.argv[2]

http.get(url, response =>{

    response.pipe(bl((err, data) => {
            console.log(data.toString().length)
            console.log(data.toString())
            
        }
    ))
})