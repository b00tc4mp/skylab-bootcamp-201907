function fill(arr, val, start, end) {
    var result = arr;
    if (!start) {
        start = 0;
    }
    if (!end) {
        end = arr.length;
    }
    for (var i = start; i < end; i++) {
        arr[i] = val;
    }
    return result;
}
