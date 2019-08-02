/**
 * Returns de value of the fisrt element in the array that satisfies the condition.
 * @param {*} array The array done.
 * @param {*} condition provided testing function.
 */


function find(array, condition) {
    var result;
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) == true && !result) {
            result = array[i];
        }
    }
    if (!result) {
        result = undefined;
    }

    return result;

}
