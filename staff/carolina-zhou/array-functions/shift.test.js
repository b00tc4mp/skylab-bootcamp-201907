console.log('TEST shift');

var array = [1, 2, 3];

var result = shift(array);
check(result, 1);
check(array, [2, 3]);

result = shift(array);
check(result, 2);
check(array, [3]);

result = shift(array);
check(result, 3);
check(array, []);
