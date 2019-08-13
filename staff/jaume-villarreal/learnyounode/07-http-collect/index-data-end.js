const http = require('http')
const { argv : [ , , url] } = process

http.get(url , response => {
    response.setEncoding('utf-8')
    
    response.on('error' , error => {throw error})

    let content = ''

    response.on('data' , chunk => content += chunk)

    response.on('end' , () => { console.log(`${content.length}\n${content}`) } )
}).on('error' , error => {throw error})