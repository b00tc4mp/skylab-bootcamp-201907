/**
 * Returns de array modified with a part of the array copied to another location in the array.
 * @param {*} arr The array to modificate.
 * @param {*} index The index at which copy the secuence. By default, is 0. If it is negative, starts to the end.
 * @param {*} start The index at which start the copy.
 * @param {*} end The index to end copying element. By defaul, is the arr.length.
 */

function arrayWithin(arr, index, start, end) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');
    for(var i = start; i< end; i++){
        arr[index++]= arr[i];
    }
    return arr;
} 
