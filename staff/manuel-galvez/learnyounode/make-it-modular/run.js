const filterFunc = require('./index')

filterFunc(process.argv[2], process.argv[3], (err, data) => {
	if (err) console.log(err)
	data.forEach(d => console.log(d))	
})
