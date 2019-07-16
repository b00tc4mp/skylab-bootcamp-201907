console.log('TEST: unshift');

var array1 = [1, 2, 3];
console.log('array', array1);

var result = unshifty(array1, 4, 5);
check(result, 5);

// console.log('returns array length');
// console.log(array1, 'expected: [4, 5, 1, 2, 3]');
