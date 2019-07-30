'use strict'

function every(array, expression) {    
    if (arguments.length === 0) throw TypeError('missing first argument (array)');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    
    for (var i = 0; i < array.length; i++) {
        if (!(expression(array[i]))) return false;
        else continue;       
    }
    return true;
}