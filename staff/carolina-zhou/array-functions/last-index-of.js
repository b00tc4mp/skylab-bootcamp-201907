function lastIndexOf(array, elemValue) {
    if (arguments.length === 0) throw TypeError('missing argument when calling function lastIndexOf');

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === elemValue) {
            return i   
        }
    }
    return -1
}