console.log('DEMO DE MAP');

var array = [1, 2, 3];
console.log('array ', array);

var result = map(array, function(value){ return value * coeficient; });
console.log('result', result);
console.log('expected : [10, 20, 30]');

array = [1, 2, 3];
console.log('array ', array);

var result = map(array, function(value){ return '<' + value + '>'; });
console.log('result', result);
console.log('expected : ["<1>", "<20>", "<30>"]');