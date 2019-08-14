const http = require('http')

const {argv: [,, url] } = process

http.get(url, res => {
	res.setEncoding('utf8')
	res.on('error', error => {throw Error(error)})
	res.on('data', data => console.log(data))
})

