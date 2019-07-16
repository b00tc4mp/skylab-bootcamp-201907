console.log('DEMO: reduce');


var array1 = [1, 2, 3, 4, 5];
var reducer = (accumulator, currentValue) => accumulator + currentValue;



console.log("Expected: 15");
console.log("Result: " + array1.reduce(reducer));

console.log("Expected: 20");
console.log("Result: " + array1.reduce(reducer, 5));
