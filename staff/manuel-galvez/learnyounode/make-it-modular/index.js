const fs = require('fs')

function myFilteringFunc(pathname, fileExt, callback) {
	fs.readdir(pathname, (err, data) => {
	if (err) return callback(err) 
	const filteredList = data.filter(f => f.includes('.' + fileExt))
	return callback(null, filteredList)
	})
}

module.exports = myFilteringFunc
