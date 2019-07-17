console.log('TEST copyWithin');

var array = [ 0, 1, 2, 3, 4, 5, 6, 7];

check(array.copyWithin(0, 2, 4), ["2", "3", "2", "3", "4", "5", "6", "7"]);

// case: no arguments
try {
    copyWithin();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function copyWithin');
}

// case: not a number
try {
    copyWithin("a");
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'a is not a number');
}