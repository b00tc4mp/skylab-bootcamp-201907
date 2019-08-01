/**
 * Method removes the first element from an array and it returns the removed element.
 * @param {*} arr The array to changes.
 */

function shift(arr) {
    var last = array[array.length - 1];

    array.length = array.length - 1;

    return last;
}