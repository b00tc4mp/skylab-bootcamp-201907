console.log('DEMO: flatMap');

var array = [1, 2, 3, 4];
console.log('array', array);

console.log('flatMap');
var result = flatMap(array, '+', 2);
console.log(result, 'expected: [3, 4, 5, 6]');
console.log(array, 'expected: [1, 2, 3, 4]');


