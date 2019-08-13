//const math = require('./math')
const { add, mul } = require('./math')

// node . add 1 2 3 4 5
// node . mul 1 2 3 4 5

const { argv: [, , oper, ...nums] } = process

switch (oper) {
    case 'add':
        // console.log(math.add(nums))
        console.log(add(nums))
        break
    case 'mul':
        // console.log(math.mul(nums))
        console.log(mul(nums))
}
