//The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
//var array1 = [1, 2, 3];

function unshifty(arr) {
    var inc = arguments.length - 1
    var length = arr.length
    for (var i = length - 1; i >= 0; i--){
        arr[i + inc] = arr[i]
    }
    for (var j = 1; j < arguments.length; j++)
        rr[j - 1] = arguments[j]
    
    return arr.length
}
