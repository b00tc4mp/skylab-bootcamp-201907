function reduce(array, reducer, initialValue) {

    if (arguments.length !== 2 && arguments.length !== 3) throw TypeError("Wrong number of arguments: two expected (Array, Callback function).");
    if (!(array instanceof Array)) throw TypeError("First argument must be an array.");
    if (!(reducer instanceof Function)) throw TypeError("Second argument must be a callback function that takes 2 arguments (accumulator, value).");
    if (reducer.length !== 2) throw TypeError("Callback function must have two arguments (accumulator, value).");
    
  
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
