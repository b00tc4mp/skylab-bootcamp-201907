/**
 * Method applies a function to reduce and return a single value from right to left.
 * @param {*} accumulatort The current element being processed in the array.
 * @param {*} currentValue The value previously returned in the last invocation of the callback.
 * 
 */

var expression = function (accumulator, currentValue) {return accumulator + currentValue;};

function reduceRight(arr,expression){
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    var result = [];
    for (var i = arr.length -1; i >= 0  ;i--) result = expression(result, arr[i]);
    
   return result;
}

