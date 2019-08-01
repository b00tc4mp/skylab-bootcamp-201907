function splice(array, start, remove, add1, add2) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(typeof start === 'number')) throw TypeError(start + ' is not a number');


    var newArray = [];
    var n = 0;
    var x = remove;

    for (var i = 0; i < array.length; i++) {
        if (i < start) {
            newArray[n++] = array[i];
        } else if (x >= 0) {
            if (x === 0) {
                newArray[n++] = array[i];
                if (add1 != 0) {
                    newArray[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        newArray[n++] = add2;
                        add2 = 0;
                    }
                }
            } else if (x-- === 1) {
                if (add1 != 0) {
                    newArray[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        newArray[n++] = add2;
                        add2 = 0;
                    }
                }
            }
        } else if (array.length > start + remove) {
            newArray[n++] = array[i];
        }
    }
    return newArray;
}
