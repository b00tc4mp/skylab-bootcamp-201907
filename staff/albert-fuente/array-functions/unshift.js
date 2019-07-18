function unshifty(arr) {
    if (!(arr instanceof Array)) throw TypeError("unshifty necesita que el primer parámetro sea un Array");
 
    var inc = arguments.length - 1
    var length = arr.length
    for (var i = length - 1; i >= 0; i--){
        arr[i + inc] = arr[i]
    }
    for (var j = 1; j < arguments.length; j++)
        arr[j - 1] = arguments[j]
 
    return arr.length
 }