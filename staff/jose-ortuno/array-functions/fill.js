function fill(array, value, start, end) {

    var newArr = array;

    for (var i = start; i < end; i++) {
        newArr[i] = value;
    }
    return newArr;
}

// var arr = [1,2,3,4,5]

// console.log(fill (arr, 0, 1, 3));