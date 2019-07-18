console.log('DEMO: join');

var elements = ['Fire', 'Air', 'Water'];
console.log('array', elements);

console.log('join(elements)');
var result = join(elements);
console.log(result, 'Expected: Fire,Air,Water');

console.log("join(elements, '@')");
var result = join(elements, '@');
console.log(result, 'Expected: Fire@Air@Water');
