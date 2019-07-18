function lastIndexOf(array, elemValue) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === elemValue) {
            return i;
        }
    }
    return -1;
};