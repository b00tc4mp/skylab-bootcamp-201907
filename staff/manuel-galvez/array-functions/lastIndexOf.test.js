console.log('------ TEST: lastIndexOf ------')

var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']
console.log('Array: ' + array)


console.log('TEST 1: a')
var valueToBeSearched = 'a'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 4);

console.log('TEST 2: e')
var valueToBeSearched = 'e'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 5);
