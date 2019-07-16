console.log('TEST filter');

var array = ['hola', 'adios', 'guanchope', 'cosita', 'manomens'];
var array2 = ['a', 'addnte','bajo', 'addnte'];

var result = filter(array, 5);
check(result, ['guanchope', 'cosita', 'manomens']);
check(array, ['hola', 'adios', 'guanchope', 'cosita', 'manomens']); 

var result2 = filter(array2);
check(result2, []);
check(array2, ['a', 'addnte','bajo', 'addnte']); 