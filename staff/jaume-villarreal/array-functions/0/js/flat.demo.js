console.log('DEMO: flat');

var array = [1,2,3,[1,2,3,4, [2,3,4]]];
console.log('array', array);

console.log('flat');
var result = flatten(array);
console.log(result, 'expected;// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]');


