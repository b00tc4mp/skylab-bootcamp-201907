const fs = require('fs')
const http = require('http')
const {argv: [, , folder] } =process

http.get(folder, (response)=>{
    response.setEncoding('utf8')

    response.on('error', error => {throw error})
    
    response.on('data', content => console.log(content))

})
.on('error', error => { throw error })
