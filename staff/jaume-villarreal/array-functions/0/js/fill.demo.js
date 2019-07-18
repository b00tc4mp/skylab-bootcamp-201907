console.log('DEMO: fill');

var array = [1, 2, 3, 4, 5];
var array2 = [1, 2, 3, 4, 5];
var array3 = [1, 2, 3, 4, 5];
var array4 = [1, 2, 3, 4, 5];

console.log('array', array);


console.log('fill');
var result = fill(array, 5, 2);
console.log(result, 'expected: [1, 5, 5, 5, 5]');
console.log(array, "expected: [1, 5, 5, 5, 5]"); 


console.log('fill');
var result2 = fill(array2, 1, 2, 3);
console.log(result2, 'expected: [1, 2, 1, 1, 5]');
console.log(array2, "expected: [1, 2, 1, 1, 5]"); 



console.log('fill');
var result3 = fill(array3, 5);
console.log(result3, 'expected: [5, 5, 5, 5, 5]');
console.log(array3, "expected: [5, 5, 5, 5, 5]"); 

console.log('fill');
var result4 = fill(array4, 14, 2, 4);
console.log(result4, 'expected: [1, 2, 14, 14, 14]');
console.log(array4, "expected: [1, 2, 14, 14, 14]"); 