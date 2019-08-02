/**
 * Method test whether at least one element in the array pass the test. It returns a boolean value.
 * @param {*} arr The array to do the test.
 * @param {*} expression The function test provided.
 */


function some(arr,expression) {
    var result;
    for (var i = 0; i < arr.length; i++) {
        if (expression(arr[i])) result = true;
        else if(!(expression(arr[i])) && result == true) result = true;
        else result = false;
    }return result;
}
