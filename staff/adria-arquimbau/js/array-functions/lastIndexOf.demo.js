console.log('DEMO: lastIndexOf');
console.log('Igual que IndexOf, pero lo recorre en sentido contrario');
console.log('array ' + animals);
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];


console.log('animals.lastIndexOf(Dodo): ' +animals.lastIndexOf('Dodo') + '// expected output: 3');

console.log('animals.lastIndexOf(Tiger): ' +animals.lastIndexOf('Tiger') + '// expected output: 1');
console.log('animals.lastIndexOf(Dog): ' +animals.lastIndexOf('Dog') + '// expected output: -1');

