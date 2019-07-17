function flat(array) {
    if (!(array instanceof Array)) throw TypeError(`${array} is not an array`);

    var depth = arguments[1] || 1;
    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        if (depth > 0) {
            if (element instanceof Array) {
                for (var j = 0; j < array.length; j++) {
                    result.push(element)
                }
            } else {
                result.push(element)
            }
        } else {
            result.push(element)
        }
    }
    return result
}