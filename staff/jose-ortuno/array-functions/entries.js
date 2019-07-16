function entries (arr) {
    var result;
    for (var i = 0; i < arr.length; i++) {
        result += `[${i}, "${arr[i]}"]`;
    }
}