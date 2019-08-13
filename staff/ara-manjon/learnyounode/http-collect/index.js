const http = require('http')
const bl = require('bl')
const { argv: [, , url] }= process


http.get(url, response => {
    response.pipe(bl((data) =>{
        response.setEncoding('utf8')
        response.on('error', error => { throw error })        
        console.log(data.toString().length)
        console.log(data.toString())    
    }))
})
/* para recopilar toda la información data 
let content= ''
response.on('data', chunk => content += chunk)
response.on('end', ()=> console.log(`${content.length}\n${content}`))
*/

