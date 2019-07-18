console.log('------ DEMO: lastIndexOf ------')

var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']
console.log('Array: ' + array)



var valueToBeSearched = 'a'
console.log('Example 1. Value to be searched: ' + valueToBeSearched)

var result = lastIndexOf(array, valueToBeSearched)
console.log('Result: ' + result, 'Expected 4')

var valueToBeSearched = 'e'
console.log('Example 1. Value to be searched: ' + valueToBeSearched)

var result = lastIndexOf(array, valueToBeSearched)
console.log('Result: ' + result, 'Expected 5')


