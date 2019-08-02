/**
 * Method adds one or more elements to the beginning of an array and returns a nrew array.
 *
 */

function unshift(arr,arguments) {
    var result = [];
    for (var i = 0; i < arguments.length; i++){
        result[i] = arguments[i];
    };
    for (var i = 0; i < arr.length; i++){
        result[i + arguments.length] = arr[i];
    };
    return result.length;
};

