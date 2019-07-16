console.log('TEST some');

var array = [1, 2, 3];

var result = some(array, 1);
check(result, true);
check(array, [1, 2, 3]); 

result = some(array, 4);
check(result, false);
check(array, [1, 2, 3]);

result = some(array, 3);
check(result, true);
check(array, [1, 2, 3]);
