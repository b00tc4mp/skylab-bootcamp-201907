console.log('TEST lastIndexOf')

var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']

var valueToBeSearched = 'a'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 4)

var valueToBeSearched = 'e'
var result = lastIndexOf(array, valueToBeSearched)
check(result, 5)

// case: no arguments
try {
    lastIndexOf();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function lastIndexOf');
}

// case: not an array
try {
    forEach(1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array');
}