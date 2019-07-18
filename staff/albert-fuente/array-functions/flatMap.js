function flat(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
 
    var depth = arguments[1];
    depth = typeof depth === 'undefined'? 1 : depth;
 
    var result = [];
 
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
 
        if (depth > 0)
            if (element instanceof Array) {
                var arr = flat(element, depth - 1);
 
                for (var j = 0; j < arr.length; j++) result.push(arr[j]);
            } else result.push(element);
    }
 
    return result;
 }