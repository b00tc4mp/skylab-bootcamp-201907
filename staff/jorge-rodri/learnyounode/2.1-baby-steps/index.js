const { argv: [,,...nums] } = process

let sum = nums.reduce((a,b) => parseInt(a)+parseInt(b))
console.log(sum)