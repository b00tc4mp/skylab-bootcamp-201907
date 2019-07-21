/**
 * Modifies the array from the star index (default zero) to an end index (default array length). Returns the modified array
 * @param {*} arr The array to modificate.
 * @param {*} val The value to introduce in the array.
 * @param {*} start The index in the array to start the introduction of the value.
 * @param {*} end The last index to introduce the value.
 */


function fill(arr, val, start, end) {
    if(!(arr instanceof Array)) throw TypeError (arr +' is not an array');
    if(!(arr instanceof Function)) throw TypeError (arr+' is not a function');


    var result = arr;
    if (!start) {
        start = 0;
    }
    if (!end) {
        end = arr.length;
    }
    for (var i = start; i < end; i++) {
        arr[i] = val;
    }
    return result;
}

