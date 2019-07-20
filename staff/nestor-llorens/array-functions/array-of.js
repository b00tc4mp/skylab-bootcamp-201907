'use strict'

function arrayOf() {
    if (arguments.length === 0) throw TypeError('missing first argument)');
    var output = [];
    for (var i = 0; i< arguments.length; i++) output.push(arguments[i]);
    return output;
}