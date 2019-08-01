function isArray(array) {

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (array instanceof Array) {
        return true;
    } else {
        return false;
    }

}