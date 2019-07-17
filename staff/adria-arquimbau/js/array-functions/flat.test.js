console.log('TEST: flat');

var array = [1,2,3, ['a', 'b', 'c' , [true, false]]];

// case default

var result = flat(array);

check(result, [1, 2, 3, 'a', 'b', 'c' , [true, false]]);

// case depth 2

var result = flat(array, 2);

check(result, [1, 2, 3, 'a', 'b', 'c' , true, false]);

// case: no array

try {
    flat();
} catch (error) {
    check(error instanceof TypeError, true); 
    check(error.message, 'undefined is not an array');
}

// case: string

try {
    flat('string');
} catch (error) {
    check(error instanceof TypeError, true); 
    check(error.message, 'undefined is not an array');
}

// case: boolean

try {
    flat(true);
} catch (error) {
    check(error instanceof TypeError, true); 
    check(error.message, 'undefined is not an array');
}

