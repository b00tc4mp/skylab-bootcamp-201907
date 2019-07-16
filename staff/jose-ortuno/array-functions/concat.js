function concat (...arg) {
    var newArray = [];
    var count = 0;

    for (i = 0; i < arg.length; i++) {
        for (j = 0; j < arg[i].length; j++) {
            newArray[count] = arg[i][j];
            count++
        }
    }
    return newArray;
}