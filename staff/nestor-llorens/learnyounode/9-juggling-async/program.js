const http = require("http")
let count = 1
const urls = process.argv.slice(2)
let result = new Array(urls.length).fill('')

urls.forEach((url, index) => {
    http.get(url, response => {
        response.setEncoding("utf8")
        response.on("data", data => result[index] += data
        )
        response.on("end", () => {
            if (count === urls.length) {
                result.forEach(res => console.log(res))
            } 
            else count++
        })
    })
})