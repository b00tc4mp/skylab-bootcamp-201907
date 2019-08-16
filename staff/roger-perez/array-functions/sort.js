function sort (array, expression) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  
    var sorted = [array[0]]
    expression = expression || function (a, b) { return String(a) >= String(b); }
    
    for (var i = 1; i < array.length; i++) {
      var indexToInsert = 0
            for (var j = 0; j < sorted.length; j++) {
        if (expression(array[i], sorted[j])) {
          indexToInsert = j + 1
        } else {
          break
        }
      }
      
      sorted.splice(indexToInsert, 0, array[i])
    }
  return sorted
}