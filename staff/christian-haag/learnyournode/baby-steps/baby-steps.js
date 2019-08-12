console.log(process.argv.slice(2).reduce((acc, val) => acc + Number(val), 0))
