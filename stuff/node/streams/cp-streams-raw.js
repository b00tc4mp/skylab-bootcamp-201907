const fs = require('fs')

// node . from-file-path to-file-path

const { argv: [, , from, to] } = process

const rs = fs.createReadStream(from)
const ws = fs.createWriteStream(to)

rs.on('data', chunk => ws.write(chunk))

rs.on('end', () => console.log(process.memoryUsage()))
