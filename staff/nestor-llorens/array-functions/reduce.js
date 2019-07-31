'use strict'

function reduce(array, expression) {;
    if (arguments.length === 0) throw TypeError('missing first argument (array)');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    var total = null;
    for (var i = 0; i < array.length; i++) total += expression(array[i]);
    return total;
}