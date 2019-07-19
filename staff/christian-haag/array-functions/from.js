'strict mode'
/**
 * Creates a new, shallow-copied Array instance from an array-like or iterable object.
 * 
 * @param {Array*} arrayLike 
 * @param {Function} expression Calls a map function to each value of the array
 * 
 * @return {result} Shallow copy from array
 */

function from(arrayLike, expression) {
  if (arguments.length === 0)
    throw TypeError("missing argument 0 when calling function Map");

  if (expression) {
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function')
  }

  var result = []
  for (var i = 0; i < arrayLike.length; i++) {
    result[i] = arrayLike[i]

    if (typeof arrayLike === 'object') {
      result[i] = arrayLike[i]

      if (expression) {
        result[i] = expression(arrayLike[i], i, arrayLike);
      }

    }

  }
  return result
}