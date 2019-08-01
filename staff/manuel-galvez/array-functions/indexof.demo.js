console.log('DEMO: indexOf');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log('array', beasts);

console.log('indexOf(camel)');
var result = indexOf(beasts, 'camel');
console.log(result, 'Expected: 2');

console.log('indexOf(bison)');
var result = indexOf(beasts, 'bison');
console.log(result, 'Expected: 1');

console.log('indexOf(felipe)');
var result = indexOf(beasts, 'felipe');
console.log(result, 'Expected: -1');
