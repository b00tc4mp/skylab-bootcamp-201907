function concat (...arg) {
    if (arg.length === 0) throw TypeError (`missing argument when calling function concat`);
    if (arg.length === 1) throw TypeError (`missing argument two when calling function concat`);
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