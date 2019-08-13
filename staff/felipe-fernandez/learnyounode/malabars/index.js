const http = require ('http')
const bl = require('bl')
 

let urls = process.argv.slice(2)

let count=0
let data1=[]

urls.forEach((element,index) => {
    http.get(element,  (response) =>{
        response.pipe(bl((error,data) => {
            if (error) throw Error
            data1[index] = data.toString()
            count ++
            if (count===urls.length) {
                data1.forEach(el=>{
                    console.log(el)
                })
            }
        }))
    })
}) 

