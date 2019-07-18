function reduceRight(array, reducer, initialValue) {
    if (initialValue || initialValue === 0) {
        var accumulator = initialValue
        var start = array.length - 1
    } else {
        var accumulator = array[array.length-1]
        var start = array.length - 2
    }
        
    for (var i = start; i >= 0; i--) {
        accumulator = reducer(accumulator, arr[i])
    }
    return accumulator
}

reduceRight(arr, function(accumulator, value) {
    return accumulator + value;
})
