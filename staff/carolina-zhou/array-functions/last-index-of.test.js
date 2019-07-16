console.log('TEST lastIndexOf')

var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']

var valueToBeSearched = 'a'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 4)

var valueToBeSearched = 'e'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 5)