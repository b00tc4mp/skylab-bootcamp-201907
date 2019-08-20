function reduce(array, reducer, initialValue) {

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  
    if (initialValue || initialValue === 0) {
        var accumulator = initialValue
        var start = 0
    } else {
        var accumulator = array[0]
        var start = 1
    }
      
    for (var i = start; i < array.length; i++) {
        accumulator = reducer(accumulator, array[i])
    }
    return accumulator
} 