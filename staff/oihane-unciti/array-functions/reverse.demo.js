console.log('DEMO: reverse');

var array1 = ['one', 'two', 'three'];
console.log('array1: ' + array1 + '// expected output: Array [one', 'two', 'three]');

var reversed = array1.reverse(); 
console.log('reversed: ( array1.reverse() ) :' + reversed + '// expected output: Array [three', 'two', 'one]');

console.log('/* Careful: reverse is destructive. It also changes the original array */ ')

console.log('array1: ' + array1 + '// expected output: Array [three', 'two', 'one]');

