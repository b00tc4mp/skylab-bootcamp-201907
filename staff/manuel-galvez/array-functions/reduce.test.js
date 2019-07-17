 suite('reduce', function() {

    test(
        'wrong number of arguments.', 
        reduce(),
        function() {
            check(error instanceof TypeError, true);
            check(error.message, "Wrong number of arguments: two expected (Array, Callback function).");
        });
    

    test(
        'first argument is not an array',
        reduce('a', function(accumulator, value) {
            return accumulator + value
        }),
        function() {
            check(error instanceof TypeError, true);
            check(error.message, "First argument must be an array.");
        }
    );

    test(
        'second argument is not a function',
        reduce([1,2,3,4], 'a'),
        function() {
            check(error instanceof TypeError, true);
            check(error.message, "Second argument must be a callback function thaht takes 2 arguments (accumulator, value).");
        });
    
    test(
        'initialValue undefined or number.',
        reduce([1,2,3,4], function(accumulator, value) {
            return accumulator + value}, 'aaaaa'),
            function() {
                check(error instanceof TypeError, true);
                check(error.message, "InitialValue must be either undefined or a number.");
            }
        );

     test(
         'Callback function has no arguments',
        function() {
            reduce([1,2,3,4], function() {
            return accumulator + value
        })},
        function() {
            check(error instanceof ReferenceError, true);
            check(error.message, "Callback function must have two arguments (accumulator, value).");
        })
})

/* console.log('------ TEST: reduce ------')

// TEST 1
console.log('TEST 1 (Multiply numeric array without initial value)');
var array = [1, 2, 3, 4];
var result = reduce(array, function(accumulator, value) {
    return accumulator * value;
});

check(result, 24)

// TEST 2
console.log('TEST 2 (Sum numeric array with initial value 2)');
var result = reduce(array, function(accumulator, value) {
    return accumulator + value;
}, 2);

check(result, 12);

// TEST 3
console.log('TEST 3 (Sum string array (concatenate))');
var array2 = ['a', 'b', 'a', 'c', 'a'];
var result = reduce(array2, function(accumulator, value) {
    return accumulator + value;
});

check(result, 'abaca');
  */

/* COMMENTED OUT BECAUSE NOW WE HAVE TEST-A-RUDE 

// Case 1: Wrong number of arguments
console.log('--- Case 1: Wrong number of arguments. ---');
try {
    reduce();
} catch(error) {
    check(error instanceof ReferenceError, true);
    check(error.message, "Wrong number of arguments: two expected (Array, Callback function).");
}

// Case 2: First argument is not an array
console.log('--- Case 2: First argument is not an array. ---');
try {
    reduce('a', function(accumulator, value) {
        return accumulator + value
    });
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "First argument must be an array.");
}

// Case 3: Second argument is not a function
console.log('--- Case 3: Second argument is not a function. ---');
try {
    reduce([1,2,3,4], 'a');
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "Second argument must be a callback function thaht takes 2 arguments (accumulator, value).");
}

// Case 4: Initial value must be undefined or number
console.log('--- Case 4: Initial value must be undefined or number. ---')
try {
    reduce([1,2,3,4], function(accumulator, value) {
        return accumulator + value
    }, 'aaaaa');
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "InitialValue must be either undefined or a number.");
}
// Case 5: Callback function has no arguments
console.log('--- Case 5: Callback function has no arguments. ---')
try {
    reduce([1,2,3,4], function() {
        return accumulator + value
    });
} catch(error) {
    check(error instanceof ReferenceError, true);
    check(error.message, "Callback function must have two arguments (accumulator, value).")
}
 */

