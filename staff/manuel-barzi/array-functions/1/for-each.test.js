console.log('TEST forEach');

var array = ['a', 'b', 'c'];

var outputs = [];

forEach(array, function (element, index, array) {    
    outputs.push([element, index, array]);
});

check(outputs, [
    ['a', 0, ['a', 'b', 'c']],
    ['b', 1, ['a', 'b', 'c']],
    ['c', 2, ['a', 'b', 'c']]
]);


array = [1, 2, 3];

var result = 0;
forEach(array, function (value) {
    result += value;
});

check(result, 6);

// case: no arguments

try {
    forEach();
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
