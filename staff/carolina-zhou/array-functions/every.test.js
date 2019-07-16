console.log('TEST every');

var array = [1, 2, 3];

var result = every(array, 1);
check(result, true);
check(array, [1, 2, 3]); 

result = every(array, 4);
check(result, false);
check(array, [1, 2, 3]);

result = every(array, 3);
check(result, true);
check(array, [1, 2, 3]);
