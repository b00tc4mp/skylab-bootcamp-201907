console.log('DEMO: push');

var array = [1, 2, 3];

console.log('push')
var result = push(array, 'a');
check(result, 4);
check(array, [1, 2, 3, 'a'])

result = push(array, 'b');
check(result, 5);
check(array, [1, 2, 3, 'a', 'b']);