console.log('DEMO: reverse');

var array = [1, 2, 3, 4, 5];
console.log('array', array);

console.log('reverse');
var result = reverse(array);
console.log(result, 'expected: [5, 4, 3, 2, 1]');
console.log(array, 'expected: [5, 4, 3, 2, 1]');

console.log('reverse');
result = reverse(array);
console.log(result, 'expected: [1, 2, 3, 4, 5]');
console.log(array, 'expected: [1, 2, 3, 4, 5]');
console.log("----------------------------------------");