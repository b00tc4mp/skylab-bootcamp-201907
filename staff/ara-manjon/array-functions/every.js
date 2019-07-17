function every(array, condition) {

    if(!(array instanceof Array)) throw TypeError (array + ' is not an array');
    if(!(condition instanceof Function)) throw TypeError (condition + ' is not a function');
    



    var result
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]) != true) {
            result = false;
        } else {
            result = true;
        }
    }
    return result;
}

