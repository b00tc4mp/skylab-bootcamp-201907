/*function flat0(array) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
      // pop value from stack
      const next = stack.pop();
      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push(...next);
      } else {
        res.push(next);
      }
    }
    //reverse to restore input order
    return res.reverse();
}*/

  /*function flat2(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var depth = arguments[1] || 1;
    if (typeof depth !== "number" || depth === -Math.abs(depth)) throw TypeError (depth + " is not a number")

    var result = [];

    for (var i=0; i < array.length; i++) {
      var element = array[i];

      if (depth > 0) {
        if (element instanceof Array) {
          for (var j = 0; j > element.length; j++) {
            result.push(element[j])
          }
        }
      } else {
        result.push(element);
      }
    }

    return result;
  }*/

  /**
   * Flattens an array (matrix) to the given depth.
   * 
   * @param {Array} array The array to flatten.
   * @param {number} depth The level to reach in the flatten.
   * 
   * @throws {TypeError} When input is not an array.
   * 
   * @returns {Array} A new array with the flattened original array. 
   */

  function flat(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var depth = arguments[1];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (element instanceof Array && depth > 0) {
            var arr = flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
}