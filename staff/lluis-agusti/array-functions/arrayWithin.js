/**
 * Copies part of an array to another location in the same array and returns it without
 * modifying its length.
 * 
 * @param {Array} array Original array.
 * @param {Number} target Zero-based index at which to copy the sequence to.
 * If negative, target will be counted from the end.
 * @param {Number} start Zero-based index at which to start copying elements from.
 * If negative, start will be counted from the end.
 * 
 * @throws {TypeError} When inputs length is === 0.
 * @throws {TypeError} When input is not an array.
 * 
 * @returns {Array} A new array with part of an array to another location without
 * modifying its length.
 */



function arrayWithin(array, target, start) {
    
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(array instanceof Array)) throw TypeError("1 is not an array");

    // if (!(target instanceof Number)) throw TypeError("target is not a number");

    // if (!(start instanceof Number)) throw TypeError("start is not a number");

    array[target] = array[start];
    return array;
}