const arg = process.argv.slice(2)
const accumulator = arg.reduce( (acc , val) =>  acc + Number(val) , 0)
console.log (accumulator)