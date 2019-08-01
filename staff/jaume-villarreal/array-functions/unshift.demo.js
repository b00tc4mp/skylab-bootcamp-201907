console.log('DEMO: unshift');

var array1 = [1, 2, 3];
console.log('array', array1);

console.log('unshift', '4', '5');
var result = unshift(array1, 4, 5);

console.log(result, 'expected: 5 (returns array length');
console.log(array1, 'expected: [4, 5, 1, 2, 3]');