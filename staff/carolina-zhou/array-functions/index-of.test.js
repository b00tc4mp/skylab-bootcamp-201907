console.log('TEST indexOf');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

var result = indexOf(beasts, 'camel');
check(result, 2);

var result = indexOf(beasts, 'bison');
check(result, 1);

var result = indexOf(beasts, 'felipe');
check(result, -1);

// case: no arguments
try {
    indexOf();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function indexOf');
}

// case: not an array
try {
    indexOf(1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array');
}