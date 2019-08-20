const { argv } = process
const [, , ...num] = argv
const sum = num.reduce((pre, val) => Number(pre) + Number(val))
console.log(sum)