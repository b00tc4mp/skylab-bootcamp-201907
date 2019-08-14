const http = require('http')
const bl = require('bl')

http.get(process.argv[2], res => {
  res.pipe(bl((err, data) => {
    if (err) throw err
    console.log(data.toString().length)
    console.log(data.toString())
  }))
})