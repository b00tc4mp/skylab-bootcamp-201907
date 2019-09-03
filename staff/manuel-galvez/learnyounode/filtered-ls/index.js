const fs = require('fs')

fs.readdir(process.argv[2], (err, list) => {
	if (err) throw Error(err.message)
	const filteredList = list.filter(f => f.includes('.' + process.argv[3]))
	filteredList.forEach(l => console.log(l))
})
