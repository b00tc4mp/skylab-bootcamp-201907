/**
 * Sort the elements of the array and returns the sorted array.
 * @param {*} arr The array to sorted.
 * @param {*} expression Specifies a function that definies the sort order. 
 */
function sort(arr,expression) {

    var result = [arr[0]]
    expression = expression || function (a, b) { return String(a) >= String(b); }

    for (var i = 1; i < arr.length; i++) {
      var index = 0
            for (var j = 0; j < arr.length; j++) {
        if (expression(arr[i], arr[j])) {
          index = j + 1;
        } else {
          break
        }
      }
      result.splice(index, 0, arr[i])
    }
    
    return result;
};