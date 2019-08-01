/**
 * Flattens an array (matrix) to the given depth.
 * 
 * @param {Array} array The array to flatten.
 * @param {number} depth The deepest level to reach in the flatten.
 * 
 * @throws {TypeError} When input is not an array
 * 
 * @returns {Array} A new array with the flatenned original array.
 */

 function flat(array , depth) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (element instanceof Array && depth > 0) {
            var arr = flat(element, depth - 1);
            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
}