const http = require('http')
const bl = require('bl')    //requires buffer list module => buffer list collector, it doesn't need keyword ¡new when constructor is invoqued
const { argv : [ , , url] } = process
http.get(url , response => {
   response.pipe( bl ((error , data) => {
           data = data.toString()
           if(error) throw error
           console.log(data.length)
           console.log(data)
       })
   )
}).on('error' , error => {throw error})
/**
 * http get request to a url
 * bl(Buffer List) and concat-stream
 */