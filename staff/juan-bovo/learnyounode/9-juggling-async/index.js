// const http = require('http')
// var bl = require('bl')

// const url =  [process.argv[2], process.argv[3], process.argv[4]]

// http.get(url, response =>{

//     response.pipe(bl((err, data) => {
//                 console.log(data.toString().length)
//                 console.log(data.toString())
            
//         }
//     ))
// })

const http = require("http")
let count = 1

const urls = process.argv.splice(2)
const result = new Array(urls.length).fill('')

urls.forEach((url, index) => {
       http.get(url, response => {
           response.setEncoding("utf8")
           response.on("data", (data) => {
               result[index] += data
           })
           response.on("end", () => {
               if (count === urls.length) {
                   result.forEach(res => {
                       console.log(res)
                   })
               } else count++
           })
       })
   })
