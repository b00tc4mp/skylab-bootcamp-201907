console.log('DEMO: push');

var array = [1, 2, 3];
console.log('array', array);

console.log('push')
var result = push(array, 'a');
console.log(result, 'expected: 4');
console.log(array, "expected: [1, 2, 3, 'a']"); 

console.log('push')
result = push(array, 'b');
console.log(result, 'expected: 5');
console.log(array, "expected: [1, 2, 3, 'a', 'b']");