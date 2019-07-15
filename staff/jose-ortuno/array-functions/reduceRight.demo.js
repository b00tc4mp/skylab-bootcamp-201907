console.log('------ DEMO: reduceRight ------');

console.log('Example 1 (Multiply numeric array without initial value)');
var array = [1, 2, 3, 4];
console.log('Array: ' + array);

var result = reduceRight(array, function(accumulator, value) {
    return accumulator * value;
});
console.log('Result: ' + result, 'Expected 24');

console.log('Example 2 (Sum numeric array with initial value 2)');
var array = [1, 2, 3, 4];
console.log('Array: ' + array);

var result = reduceRight(array, function(accumulator, value) {
    return accumulator + value;
}, 2);
console.log('Result: ' + result, 'Expected 12');


console.log('Example 3 (Sum string array (concatenate))');
var array = ['a', 'b', 'a', 'c', 'a'];
console.log('Array: ' + array);

var result = reduceRight(array, function(accumulator, value) {
    return accumulator + value;
});
console.log('Result: ' + result, 'Expected acaba');

