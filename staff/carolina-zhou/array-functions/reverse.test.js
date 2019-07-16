console.log('TEST reverse');

var array = [1, 2, 3, 4, 5];

var result = reverse(array);
check(result, [5, 4, 3, 2, 1]);
check(array, [5, 4, 3, 2, 1]);

result = reverse(array);
check(result, [1, 2, 3, 4, 5]);
check(array, [1, 2, 3, 4, 5]);