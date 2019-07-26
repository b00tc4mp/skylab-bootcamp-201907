console.log('DEMO: shift');

var array = [1, 2, 3];
console.log('array', array);

console.log('shift');
var result = shift(array);
console.log(result, 'expected: 1');
console.log(array, 'expected: [2, 3]');

console.log('shift');
result = shift(array);
console.log(result, 'expected: 2');
console.log(array, 'expected: [3]');

console.log('shift');
result = shift(array);
console.log(result, 'expected: 3');
console.log(array, 'expected: []');