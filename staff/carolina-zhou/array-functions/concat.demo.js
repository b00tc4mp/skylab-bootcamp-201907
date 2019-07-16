console.log('DEMO: concat');

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

var newArray = array1.concat(array2);
console.log('array 1: ' + array1)
console.log('array 1: ' + array2)
console.log(newArray, 'expected: ["a", "b", "c", "d", "e", "f"]');
console.log("----------------------------------------");