
const args = process.argv.slice(2)

const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)

console.log(args.reduce(reducer))