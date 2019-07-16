console.log('DEMO: fill');

var array = ['a', 'b', 'c','d','f','g'];
console.log('array', array);

console.log('fill');
var result = fill(array,'z',2,4);
console.log(array, 'expected: '+'a', 'b', 'z','z','z','g');



var array2 = [1,2,3,4,5,6,7,8];
console.log('array2', array2);

console.log('fill');
var result = fill(array2,0,3);
console.log(array2, 'expected: '+'1,2,3,0,0,0,0,0');














