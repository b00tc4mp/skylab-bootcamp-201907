// var result = 0

// for (var i = 2; i < process.argv.length; i++) {
//     result += Number(process.argv[i])
// }

// console.log(result)

console.log (process.argv.slice(2).reduce((accum, index)=>accum+Number(index), 0))