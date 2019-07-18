function entries (iterator, arr) {
    if (arguments.length <= 1) throw TypeError('missing data. Instructions: entries (iterator array)')

    if (arr.length === 0) throw TypeError('missing Array when calling function entries')

    if (typeof iterator !== 'number') throw TypeError('an argument is not number')

    if (iterator > arr.length) throw RangeError('Iterator number is higher than array length')

    if (!(arr instanceof Array)) throw TypeError('is not array')

    var i = iterator - 1;
    var result = [];
    if (i !== array.length) {
        result[0] = i + ', ' + arr[i];
    }
    return result;
}