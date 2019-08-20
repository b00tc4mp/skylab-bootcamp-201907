function push(array, value) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (array.length) {
        array[array.length] = value;

        return array.length;
    }
}