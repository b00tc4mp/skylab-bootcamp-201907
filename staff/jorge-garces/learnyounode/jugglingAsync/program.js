const http = require('http')
const bl = require('bl')

const urls = process.argv.splice(2)
const accData = []
let count = 0

urls.forEach((url, index) => {
    http.get(url, res => {
        res.pipe(bl((err, data) => {
            if (err) return console.error(err)
            accData[index] = data
            count++
            if (count === urls.length) {
                accData.forEach(data => console.log(data.toString()))
            }
        }))
    })
})