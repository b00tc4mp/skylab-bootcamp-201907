console.log('TEST map');

var array = [1, 2, 3];

var coeficient = 10;

var result = map(array, function(value) { return value * coeficient; });
check(result, [10, 20, 30]);

array = ['1', '2', '3'];

var result = map(array, function(value) { return '<' + value + '>'; });
check(result, ["<1>", "<2>", "<3>"]);

array = [1, 2, 3];

var result = map(array, function(value,  index, array) { 
    return value + '-' + index + '-' + array; 
});
check(result, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);
