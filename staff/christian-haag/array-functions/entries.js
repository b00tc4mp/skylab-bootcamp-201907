'strict mode'
/**
 * Returns a new array containing its key/value pairs
 * 
 * @param {Array} array 
 * 
 * @throws {TypeError} 
 * 
 * @returns {Array} A new array showing its key/value pairs
 * 
 */

function entries(array) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function Entries')

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var result = [];
    var obj = {};

    for (var i = 0; i < array.length; i++) {
        obj[i] = array[i];
        result[i] = [Object.keys(obj)[i] * 1, obj[i]];
    };

    return result
};

