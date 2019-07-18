suite('lastIndexOf', function() {

    /* HAPPY PATH */
    test('find last index of repeated string',
        function() {
            var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']
            var valueToBeSearched = 'a'
            var result = lastIndexOf(array, valueToBeSearched)
            check(result, 4);
        });
    
    test('find last index of non-repeated string',
        function() {
            var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f']
            var valueToBeSearched = 'e'
            var result = lastIndexOf(array, valueToBeSearched)
            check(result, 5);
        });

     test('find last index of non-repeated number',
        function() {
            var array = ['a', 'b', 'a',1,'c', 'a', 'e', 'f']
            var valueToBeSearched = 1 
            var result = lastIndexOf(array, valueToBeSearched)
            check(result, 3);
        });

     test('find last index of array',
        function() {
            var array = ['a', 'b', 'a',1,'c', [2,3], 'a', 'e', 'f']
            var valueToBeSearched = [2,3] 
            var result = lastIndexOf(array, valueToBeSearched)
            check(result, 5);
        });


    /* EXCEPTIONS PATH */ 
    test('wrong number of arguments.', 
        function() {
            lastIndexOf()
        },
        function(error){
            check(error instanceof TypeError, true);
            check(error.message, "Wrong number of arguments: two expected (Array, ValueToSearch).");
        });

     test('first argument is not an array.', 
        function() {
            lastIndexOf('a', 'a')
        },
        function(error){
            check(error instanceof TypeError, true);
            check(error.message, "First argument must be an array.");
        });
    
});

/* console.log('------ TEST: lastIndexOf ------')

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

// Case 1: Wrong number of arguments
console.log('--- Case 1: Wrong number of arguments. ---');
try {
    lastIndexOf();
} catch(error) {
    check(error instanceof ReferenceError, true);
    check(error.message, "Wrong number of arguments: two expected (Array, Callback function).");
}

// Case 2: First argument is not an array
console.log('--- Case 2: First argument is not an array. ---');
try {
    lastIndexOf('a', function(accumulator, value) {
        return accumulator + value
    });
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "First argument must be an array.");
}
 */
