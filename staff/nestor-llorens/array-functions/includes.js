'use strict'

function includes(array, value, start) {
    if (arguments.length === 0) throw TypeError('missing first argument (array)');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (arguments.length !== 3) start = 0;
    if (start < 0) start = array.length + start;

    for (var i = start; i < array.length; i++) {
        if (array[i] === value) return true;
        else continue;
    }
    return false;
}