'strict mode'
/**
 * Pushes one or more elements to the end of an array and returns the new lenght.
 * 
 * @param {array} array 
 * @param {strings} value 
 * @param {numbers} value
 * 
 */

function push(array, value) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function Push');

    if (!(array instanceof Array)) throw TypeError(array + 'is not an array');

    if (value) {
        array[array.length] = value;
        return array.length;
    }
}
