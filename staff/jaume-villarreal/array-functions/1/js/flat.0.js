function flat(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var depth = arguments[1] || 1;

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (depth > 0)
            if (element instanceof Array) {
                for (var j = 0; j < element.length; j++) {
                    var item = element[j];

                    if (depth > 1) {
                        if (item instanceof Array)
                            for (var k = 0; k < item.length; k++) {
                                var value = item[k];

                                if (depth > 2) {
                                    if (value instanceof Array)
                                        for (var l = 0; l < value.length; l++)
                                            result.push(value[l]);
                                    else result.push(value);
                                } else result.push(value);
                            }
                        else result.push(item);
                    } else result.push(item);
                }
            } else result.push(element);
    }

    return result;
}