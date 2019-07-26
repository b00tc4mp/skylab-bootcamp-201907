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
console.log("----------------------------------------");


// --------------------------- MANU ---------------------- //

var array = [1, 2, 3];
console.log('array', array);

var coeficient = 10;

var result = map(array, function(value) {
  return value * coeficient; 
});
console.log('result:', result);
console.log(result, 'expected: [10,20,30]');


array = ['1', '2', '3'];
console.log('array', array);

var result = map(array, function (vale){
  return '<' + value + '>';
});
console.log(result, 'expected: ["<1>", "<2>", "<3>"]');


var array = [1, 2, 3];

var result = map(array, function(value, index, array){
  return value + '-' + index + '-' + array;
});
console.log(result, 'expected: ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]');
