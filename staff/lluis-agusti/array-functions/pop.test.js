





// console.log('TEST: pop');

// var array = [1, 2, 3];

// var result = pop(array);
// check(result, 3);
// check(array, [1, 2]);


// result = pop(array);
// check(result, 2);
// check(array, [1]);

// result = pop(array);
// check(result, 1);
// check(array, []);



console.log('TEST: pop');

var array = [1, 2, 3];
console.log('array', array);

console.log('pop');
var result = pop(array);
console.log(result, 'expected: 3');
console.log(array, 'expected: [1, 2]');

console.log('pop');
result = pop(array);
console.log(result, 'expected: 2');
console.log(array, 'expected: [1]');

console.log('pop');
result = pop(array);
console.log(result, 'expected: 1');
console.log(array, 'expected: []');