console.log('DEMO: entries method');

var array = ['a', 'b', 'c'];
console.log('array', array);

console.log(entries (1, array), '\nexpected method: [0, "a"]');
console.log(entries (2, array), '\nexpected method: [1, "b"]');
console.log(entries (3, array), '\nexpected method: [2, "c"]');