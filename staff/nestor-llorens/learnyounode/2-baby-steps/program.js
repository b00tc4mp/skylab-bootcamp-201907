console.log(process.argv.slice(2).reduce((acc, val) => Number(acc) + Number(val)))
