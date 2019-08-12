console.log(process.argv.slice(2).reduce((accum, value) => accum + Number(value), 0))
