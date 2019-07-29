function lastIndexOf(array, elemValue) {

    if (arguments.length !== 2) throw new TypeError("Wrong number of arguments: two expected (Array, ValueToSearch).");
    if (!(array instanceof Array)) throw new TypeError("First argument must be an array.");

    for (var i = array.length - 1; i >= 0; i--) {
        if ((typeof array[i] === typeof elemValue) && (array[i].toString() === elemValue.toString())) {
            return i   
        }
    }
    return -1
}

