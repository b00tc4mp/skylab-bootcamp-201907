suite('reduceRight', function() {


    /* HAPPY PATH */
    test('sum all items in array of numbers',
        function() {
            var result = reduceRight([1,2,3,4], function(accumulator, val) {
                return accumulator + val;
            });
            check(result, 10);
        });
    
    test('concat all items in array of strings',
        function() {
            var result = reduceRight(['a','b','c','d'], function(accumulator, val) {
                return accumulator + val;
            });
            check(result, 'dcba');
        });

     test('multiply all items in array of numbers',
        function() {
            var result = reduceRight([1,2,3,4], function(accumulator, val) {
                return accumulator * val;
            });
            check(result, 24);
        });

    test('multiply all items in array of numbers with initialValue of 2',
        function() {
            var result = reduceRight([1,2,3,4], function(accumulator, val) {
                return accumulator * val;
            }, 2);
            check(result, 48);
        });

     test('concat all items in array of both strings and numbers',
        function() {
            var result = reduceRight([1,2,'c','d',3], function(accumulator, val) {
                return accumulator + val;
            });
            check(result, '3dc21');
        });
    
     test('concat all items in array of both strings and numbers with intialValue z',
        function() {
            var result = reduceRight([1,2,'c','d',3], function(accumulator, val) {
                return accumulator + val;
            }, 'z');
            check(result, 'z3dc21');
        });

    test('concat all items in array of both strings and numbers with array as initialValue',
        function() {
            var result = reduceRight([1,2,'c','d',3], function(accumulator, val) {
                return accumulator + val;
            }, [1,2,3]);
            check(result, '1,2,33dc21');
        });
    

    /* EXCEPTIONS PATH */ 
    test('wrong number of arguments.', 
        function() {
            reduceRight()
        },
        function(error){
            check(error instanceof TypeError, true);
            check(error.message, "Wrong number of arguments: two expected (Array, Callback function).");
        });
    

    test(
        'first argument is not an array',
        function() {
            reduceRight('a', function(accumulator, value) {
                return accumulator + value
            })
        },
       function(error) {
            check(error instanceof TypeError, true);
            check(error.message, "First argument must be an array.");
        }
    );

    test(
        'second argument is not a function',
        function() {
            reduceRight([1,2,3,4], 'a')
        },
        function(error) {
            check(error instanceof TypeError, true);
            check(error.message, "Second argument must be a callback function that takes 2 arguments (accumulator, value).");
        });

     test(
         'Callback function has no arguments',
        function() {
            reduceRight([1,2,3,4], function() {
            return accumulator + value
        })},
        function(error) {
            check(error instanceof TypeError, true);
            check(error.message, "Callback function must have two arguments (accumulator, value).");
        })
})



/* console.log('------ TEST: reduceRight ------')

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

// Case 1: Wrong number of arguments
console.log('--- Case 1: Wrong number of arguments. ---');
try {
    reduceRight();
} catch(error) {
    check(error instanceof ReferenceError, true);
    check(error.message, "Wrong number of arguments: two expected (Array, Callback function).");
}

// Case 2: First argument is not an array
console.log('--- Case 2: First argument is not an array. ---');
try {
    reduceRight('a', function(accumulator, value) {
        return accumulator + value
    });
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "First argument must be an array.");
}

// Case 3: Second argument is not a function
console.log('--- Case 3: Second argument is not a function. ---');
try {
    reduceRight([1,2,3,4], 'a');
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "Second argument must be a callback function thaht takes 2 arguments (accumulator, value).");
}

// Case 4: Initial value must be undefined or number
console.log('--- Case 4: Initial value must be undefined or number. ---')
try {
    reduceRight([1,2,3,4], function(accumulator, value) {
        return accumulator + value
    }, 'aaaaa');
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, "InitialValue must be either undefined or a number.");
}
// Case 5: Callback function has no arguments
console.log('--- Case 5: Callback function has no arguments. ---')
try {
    reduceRight([1,2,3,4], function() {
        return accumulator + value
    });
} catch(error) {
    check(error instanceof ReferenceError, true);
    check(error.message, "Callback function must have two arguments (accumulator, value).")
}
 */