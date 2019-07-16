// array1 = [1, 2, 3, 4];

function filljuan(arr, value, start, end) {
    var newArray = arr;
    if (end) {
        for (var i = start; i < end; i++) {
            newArray[i] = value;
        }
    } else if (start) {
        for (var i = start; i < arr.length; i++){
            newArray[i] = value;
        }
    } else {
        for (i = 0; i< arr.length; i++){
            newArray[i] = value;
        }
    }
    return newArray;
}

// console.log(fill(array1, 0, 2, 4)); // expected output: [1, 2, 0, 0]
// console.log(fill(array1, 5, 1)); // expected output: [1, 5, 5, 5]
// console.log(fill(array1, 6)); // expected output: [6, 6, 6, 6]