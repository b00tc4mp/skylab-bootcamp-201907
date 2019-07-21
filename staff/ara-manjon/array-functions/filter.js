/**
 * Create a new array with all elements that pass the test.
 * @param {*} array The array to iterate.
 * @param {*} condition The function providing the test to pass the array.
 */

function filter(array, condition) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}
