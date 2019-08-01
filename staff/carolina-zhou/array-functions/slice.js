function slice(array, first, last){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof first !== 'number') throw new TypeError(first + ' is not a number');
    if (last !== undefined && typeof last !== 'number') throw new TypeError(last + ' is not a number');

    var cut = [];
    var negative = -Math.abs(first) 
    if (first === -Math.abs(first) && last === undefined) {
        var positive = Math.abs(negative);
        for (i = array.length-positive; i < array.length; i++) {
            cut.push(array[i]);
        }
    } else if (first === Math.abs(first) && last === undefined) {
        for (i = first; i < array.length; i++) {
            cut.push(array[i]);
        }
    } else {
        for (i = first; i < last; i++) {
            cut.push(array[i]);
        }
    }
    return cut;
}
    