console.log("DEMO: map");

var array = [1, 2, 3, 4];
console.log("array", array);

console.log("map");
var result = map(array, "+", 2);
console.log('var result = map(array, "+", 2)');
console.log("new Array:");
console.log(result, "expected: [3, 4, 5, 6]");
console.log("Old array:");
console.log(array, "expected: [1, 2, 3, 4]");

console.log("map");
var result = map(array, "*", 2);
console.log('var result = map(array, "*", 2)');
console.log("new Array:");
console.log(result, "expected: [2, 4, 6, 8]");
console.log("Old array:");
console.log(array, "expected: [1, 2, 3, 4]");