/**
 * Check all elements of the array pass the condition implemented by thee function.
 * @param {*} array The array introduced to apply the every function.
 * @param {*} condition Condition that sould pass all elements of the array to be true.
 */

function every(array, condition) {

    if(!(array instanceof Array)) throw TypeError (array + ' is not an array');
    if(!(condition instanceof Function)) throw TypeError (condition + ' is not a function');

    var result=true;
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) && result==true) {
            result = true;
        } else  {
            result = false;
        }
    }
    return result;
} 

