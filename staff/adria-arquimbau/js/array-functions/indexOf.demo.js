console.log('DEMO: indexOf');

var array = [2, 9, 'verde', 'blanco'];
console.log('array', array);

console.log('indexOf de 2');
var result = array.indexOf(2);
console.log(result, 'expected 0');

console.log('indexOf de 7');
result = array.indexOf(7);
console.log(result, 'expected -1');

console.log('indexOf de blanco');
result = array.indexOf('blanco');
console.log(result, 'expected 3');

console.log('indexOf de naranja');
result = array.indexOf('naranja');
console.log(result, 'expected -1');


