console.log('TEST flat');

var array = [1, 2, 3, ['a', 'b', 'c', [true, false, [undefined, null, [{}, function () { }, [NaN]]]]]];

// case: default

var result = flat(array);
check(result, [1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null, [{}, function () { }, [NaN]]]]]);

// case: depth 2

var result = flat(array, 2);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, [undefined, null, [{}, function () { }, [NaN]]]]);

// case: depth 3

var result = flat(array, 3);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, [{}, function () { }, [NaN]]]);

// case: random depth (1...10)

// var depth = Math.floor(Math.random() * 10) + 1;

var result = flat(array, 4);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, {}, function () { }, [NaN]]);

var result = flat(array, 5);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, {}, function () { }, NaN]);

// case: no array

try {
    flat();
} catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'undefined is not an array');
}

// case: string as array

try {
    flat('array');
} catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'array is not an array');
}

// case: string as array

try {
    flat(true);
} catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'true is not an array');
}