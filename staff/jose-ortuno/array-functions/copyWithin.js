function copyWithin (array, target, start, end) {
    var newArray = [];
    var count = 0;
    var count2 = 0;

    for (var i = start; i < end; i++) {
        newArray[count] = array[i];
        count++;
    }
    
    for (var i = 0; i < newArray.length; i++) {
        array[target] = newArray[count2];
        count2++;
        target++;
    }

    return array;
}