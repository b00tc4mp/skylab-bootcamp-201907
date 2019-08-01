console.log('DEMO: toString');

var array = [1, 2, 3];
var array1 = [6, 'bb', 'pepe', 6]
console.log('array', array);

console.log('toString');
var result = toString(array);
console.log(result, 'expected: "1,2,3"');
console.log(array, 'expected: [1, 2, 3] (sin cambios)');

console.log('toString');
result2 = toString(array1);
console.log(result2, 'expected: "6,bb,pepe,6"');
console.log(array1, 'expected: [6, bb, pepe, 6] (sin cambios)');