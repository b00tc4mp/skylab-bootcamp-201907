'use strict'

function filter(array, expression) {
    var output = [];
    if (arguments.length === 0) throw TypeError('missing first argument (array)');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < array.length; i++) {
        if (expression(array[i])) output.push(array[i]);
    }
    return output;
}