/**
 * 
 * @param {Array} array is  the array to pop.
 * @throws {TypeError} When input is not an array.
 * 
 * @returns {Array} the array length.
 * 
 */

function push(array, value) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    array[array.length] = value;

    return array.length;
}