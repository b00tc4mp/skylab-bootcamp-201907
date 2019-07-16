console.log('TEST reduce')

var array = [1, 2, 3, 4];
var result = reduce(array, function(accumulator, value) {
    return accumulator * value;
});
check(result, 24);

var array = [1, 2, 3, 4];
var result = reduce(array, function(accumulator, value) {
    return accumulator + value;
}, 2);
check(result, 12);


var array = ['a', 'b', 'a', 'c', 'a'];
var result = reduce(array, function(accumulator, value) {
    return accumulator + value;
});
check(result, 'abaca');
