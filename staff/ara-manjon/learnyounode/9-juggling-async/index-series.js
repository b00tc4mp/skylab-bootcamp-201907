const http = require('http')

let count = 1

// const { argv: [,, ..urls]} = process




function getAndPrint(url, done){
    let content=''
http.get(url, response => {
    response.setEncoding('utf8')
    response.on('data', data => {
        responses[index] += data
    })
    response.on('end', () => {        
        
            console.log(res)
            done()
        
    })
})}
