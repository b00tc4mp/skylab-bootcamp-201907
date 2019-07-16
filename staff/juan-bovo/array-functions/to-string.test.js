console.log('TEST: toString');

var array = [1, 2, 3];
var array1 = [6, 'bb', 'pepe', 6]
console.log('array', array);
console.log('array1', array1);

var result = toStringo(array);
check(result, "1,2,3");
// console.log(array, 'expected: [1, 2, 3] (sin cambios)');

result2 = toStringo(array1);
check(result2, "6,bb,pepe,6");
// console.log(array1, 'expected: [6, bb, pepe, 6] (sin cambios)');