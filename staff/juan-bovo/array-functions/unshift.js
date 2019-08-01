//The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
//var array1 = [1, 2, 3];
/**
 * Add new elements to the begin of an array. Mutates array and return mutated array length.
 * 
 * @param {Array} arr array to modify, followed by any new element to place at arr begining.
 * 
 * @throws {TypeError} when first parameter is not an array object.
 * 
 * @returns Mutated array's length.
 */

function unshifty(arr) {
    if (!(arr instanceof Array)) throw TypeError('unshifty necesita que el primer parámetro sea un Array');

    var inc = arguments.length - 1
    var length = arr.length
    for (var i = length - 1; i >= 0; i--){
        arr[i + inc] = arr[i]
    }
    for (var j = 1; j < arguments.length; j++)
        arr[j - 1] = arguments[j]
    
    return arr.length
}
