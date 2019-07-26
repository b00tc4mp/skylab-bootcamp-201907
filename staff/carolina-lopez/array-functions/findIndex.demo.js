console.log('DEMO: findIndex');

var array = [1, 2, 3 , 4 , 5];
console.log('array', array);

console.log('findIndex');
var result = findindex(array , '>' , 2);
console.log(result, 'expected: 2');

console.log('findIndex');
var result = findindex(array , '<' , 4);
console.log(result, 'expected: 0');

console.log('findIndex');
var result = findindex(array , '===' , 6);
console.log(result, 'expected: undefined');