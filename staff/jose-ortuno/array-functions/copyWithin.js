function copyWithin (array, target, start, end) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    if (end > array.length - 1) throw TypeError('superior range than array length')

    if (start < 0) throw TypeError('length less than zero is not possible')

    var newArray = [];
    var count = 0;

    for (var i = start; i < end; i++) {
        newArray.push(array[i]);
    }
    
    for (var i = 0; i < newArray.length; i++) {
        array[target] = newArray[count];
        count++;
        target++;
    }

    return array;
}