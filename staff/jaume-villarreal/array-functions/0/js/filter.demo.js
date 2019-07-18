console.log('DEMO: filter');

var array = ['hola', 'adios', 'guanchope', 'cosita'];
var array2 = ['a', 'addnte','bajo', 'addnte'];
console.log('array', array);

console.log('filter');
//condicion si es más grande que 4 la palabra
var result = filter(array, 5);
console.log(result, "expected: ['guanchope','cosita']");
console.log(array, "expected: 'guanchope','cosita']"); 

console.log('filter');
var result2 = filter(array2);
console.log(result2, `expected: []`);
console.log(array2, `expected: []`); 



