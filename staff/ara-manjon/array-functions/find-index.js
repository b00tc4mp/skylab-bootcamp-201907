/**
 * Returns the index of the fisrt element in the array that satisfies the providing test function. If any element pass the test, it returs -1.
 * @param {*} array The array given.
 * @param {*} condition The test function.
 */


function findIndex(array, condition) {
    if(!(array instanceof Array)) throw TypeError (array +' is not an array');
    if(!(condition instanceof Function)) throw TypeError (condition +' is not a function');

    var result;
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) == true && !result) {
            result = [i];
        }
    }
    if (!result) {
        result = -1;
    }

    return result;

}
