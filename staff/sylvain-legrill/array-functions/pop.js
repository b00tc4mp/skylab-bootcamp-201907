/**
 * 
 * @param {Array} array is  the array to pop.
 * @throws {TypeError} When input is not an array.
 * @type {Array} last is the array result after pop.
 * 
 * @returns {Array} last
 * 
 */

function pop(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var last = array[array.length - 1];
    array.length = array.length - 1;

    return last;
}