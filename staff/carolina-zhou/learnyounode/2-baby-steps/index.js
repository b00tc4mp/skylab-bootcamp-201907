// Extended version
/* 
const argumentList = process.argv;
const values = process.argv.slice(2)

let sum = 0;
let solution = values.forEach((value) => {
	sum += Number(value);
	return sum;
});

console.log(sum); 
*/

// Simplified version
console.log(process.argv.slice(2).reduce((accum, value) => accum + Number(value), 0))