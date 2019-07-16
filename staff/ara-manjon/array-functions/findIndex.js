function findIndex(array, condition) {
    var result;
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) == true && !result) {
            result = [i];
        }
    }
    if (!result) {
        result = -1;
    }

    return result;

}
