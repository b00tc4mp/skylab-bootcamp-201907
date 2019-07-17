function lastIndexOf(array, elemValue) {

    if (arguments.length !== 2) throw new ReferenceError("Wrong number of arguments: two expected (Array, Callback function).");
    if (!(array instanceof Array)) throw new TypeError("First argument must be an array.");

    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === elemValue) {
            return i   
        }
    }
    return -1
}

