/**
 * copyWithin function.
 * 
 * @param {Array} array The array to use in to the function.
 * 
 * @throws {TypeError} TypeError When input is not an array || not have any argument || other error.
 * 
 */

function arrayWithin(array, target, start) {
if (arguments.length === 0) throw TypeError('missing argument 0 when calling function arrayWithin');

if (!(array instanceof Array)) throw TypeError('1 is not an array');

    array[target] = array[start];

    return array;
} 