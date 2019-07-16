console.log('TEST reduceRight');

var array = [1, 2, 3, 4];
var result = reduceRight(array, function(accumulator, value) {
    return accumulator * value;
});
check(result, 24);

var array = [1, 2, 3, 4];
var result = reduceRight(array, function(accumulator, value) {
    return accumulator + value;
}, 2);
check(result, 12);


var array = ['a', 'b', 'a', 'c', 'a'];
var result = reduceRight(array, function(accumulator, value) {
    return accumulator + value;
});
check(result, 'acaba');
