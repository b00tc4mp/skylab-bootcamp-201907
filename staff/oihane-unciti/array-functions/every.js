function every(array, condition) {
    var result;s
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) != true && result != true) {
            result = false;
        } else {
            result = true;
        }
    }
    return result;
}
every(array1, biggerThan)
