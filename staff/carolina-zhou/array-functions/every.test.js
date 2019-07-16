console.log('TEST every');

var array = [1, 2, 3];
check(array, [1, 2, 3]); 

var result = every(array, 1);
check(result, true);

result = every(array, 4);
check(result, false);

result = every(array, 3);
check(result, true);

true.toString