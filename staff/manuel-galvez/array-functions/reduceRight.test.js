console.log('------ TEST: reduceRight ------')

// TEST 1
console.log('TEST 1 (Multiply numeric array without initial value)');
var array = [1, 2, 3, 4];
var result = reduceRight(array, function(accumulator, value) {
    return accumulator * value;
});

check(result, 24)

// TEST 2
console.log('TEST 2 (Sum numeric array with initial value 2)');
var result = reduceRight(array, function(accumulator, value) {
    return accumulator + value;
}, 2);

check(result, 12);

// TEST 3
console.log('TEST 3 (Sum string array (concatenate))');
var array2 = ['a', 'b', 'a', 'c', 'a'];
var result = reduceRight(array2, function(accumulator, value) {
    return accumulator + value;
});

check(result, 'acaba');
