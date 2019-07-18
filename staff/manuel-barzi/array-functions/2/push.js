/**
 * Flattens an array (matrix) to the given depth.
 * 
 * @param {Array} array The array to flatten.
 * @param {number} depth The level to reach in the flatten.
 * 
 * @throws {TypeError} When input is not an array.
 * 
 * @returns {Array} A new array with the flattened original array.
 */

function push(array, value) {
    array[array.length] = value;

    return array.length;
}