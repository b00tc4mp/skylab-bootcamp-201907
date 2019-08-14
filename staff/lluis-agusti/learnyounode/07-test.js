const http = require('http')
let count = 1
debugger
const urls = process.argv.slice(2)
// const { argv: [,, ..urls]} = process
let responses = new Array(urls.length).fill("")
urls.forEach((url,index) =>{
http.get(url, response => {
    response.setEncoding('utf8')
    response.on('data', data => {
        responses[index] += data
    })
    response.on('end', () => {        
        if(count === urls.length){
            responses.forEach(res => { console.log(res)})
        } else count++
    })
})
})