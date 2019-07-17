// console.log('TEST: pop');

// var array = [1, 2, 3];

// var result = pop(array);
// check(result, 3);
// check(array, [1, 2]);

// result = pop(array);
// check(result, 2);
// check(array, [1]);


// result = pop(array);
// check(result, 1);
// check(array, []);

try {
    forEach(array, expression);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function forEach');
}

// case: not an array

try {
    forEach(1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array');
}

