function fill(arr, val, start, end) {
    if(!(arr instanceof Array)) throw TypeError (arr +' is not an array');
    if(!(arr instanceof Function)) throw TypeError (arr+' is not a function');


    var result = arr;
    if (!start) {
        start = 0;
    }
    if (!end) {
        end = arr.length;
    }
    for (var i = start; i < end; i++) {
        arr[i] = val;
    }
    return result;
}


/* function forEach(array, expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < array.length; i++)
        expression(array[i], i, array);
}
 */
