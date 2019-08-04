const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const [x, y, z, , w, ...r] = a

// 

const nums = [1, 2]

sum(nums) // 3

function sum([a, b]) { console.log(a + b) }