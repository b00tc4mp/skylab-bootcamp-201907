console.log('DEMO map');

var array = [1, 2, 3];
console.log('array', array);

var coeficient = 10;

var result = map(array, function(value) { return value * coeficient; });
console.log(result, 'expected: [10, 20, 30]');

array = ['1', '2', '3'];
console.log('array', array);

var result = map(array, function(value) { return '<' + value + '>'; });
console.log(result, 'expected: ["<1>", "<2>", "<3>"]');

array = [1, 2, 3];
console.log('array', array);

var result = map(array, function(value,  index, array) { 
    return value + '-' + index + '-' + array; 
});
console.log(result, 'expected: ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]');

