var http = require("http")
var count = 1
var urls = process.argv.splice(2)
var result = new Array(urls.length).fill('')
 

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
    
    
    
    // response.pipe(bl((err, data) => {
    //     if (err) console.error(error)

    //     result[index] = data
    //     count++

    //     if (count === 3) {
    //     result.forEach(res => {
    //         console.log(res.toString())
    //     })
    // }
// }))





// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//   for (var i = 0; i < 3; i++)
//     console.log(results[i])
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err)
//         return console.error(err)

//       results[index] = data.toString()
//       count++

//       if (count == 3)
//         printResults()
//     }))
//   })
// }

// for (var i = 0; i < 3; i++)
//   httpGet(i)