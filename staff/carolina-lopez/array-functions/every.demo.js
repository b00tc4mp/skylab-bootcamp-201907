console.log('DEMO: every');

var array = [1, 2, 3];
console.log('array', array);


console.log('every');
var result = every(array, 1);
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]"); 

console.log('every');
result = every(array, 4);
console.log(result, 'expected: false');
console.log(array, "expected: [1, 2, 3]");

console.log('every');
result = every(array, 3);
console.log(result, 'expected: true');
console.log(array, "expected: [1, 2, 3]");
