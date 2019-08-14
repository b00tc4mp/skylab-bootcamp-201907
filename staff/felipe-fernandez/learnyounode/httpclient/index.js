const http = require ('http')

const { argv: [, , url]} = process

http.get(url, (response) => {
    response.setEncoding('utf8')
    response.on('error', console.error)
    response.on("data", (data)=>{
        console.log(data)
    
    }).on('error', console.error)

})