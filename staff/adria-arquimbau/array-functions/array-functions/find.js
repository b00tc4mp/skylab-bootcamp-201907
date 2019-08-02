function find(array, condition) {
    var result;
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) == true && !result) {
            result = array[i];
        }
    }
    if (!result) {
        result = undefined;
    }

    return result;

}
