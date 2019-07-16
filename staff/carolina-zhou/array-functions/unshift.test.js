console.log('TEST unshift');

var array1 = [1, 2, 3];

var result = unshift(array1, 4, 5);

check(result, 5);
check(array1, [4, 5, 1, 2, 3]);
