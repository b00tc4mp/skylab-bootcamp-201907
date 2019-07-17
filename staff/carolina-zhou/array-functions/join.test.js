console.log('TEST join');

var elements = ['Fire', 'Air', 'Water'];

var result = join(elements);
check(result, "Fire,Air,Water");

var result = join(elements, '@');
check(result, "Fire@Air@Water");

// case: no arguments
try {
    join();
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument when calling function join');
}

// case: not an array
try {
    join(1);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array');
}