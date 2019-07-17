/* var arr = [1, 2, 3, 4];

function map2(array, op, arg) {
  var emptyArr = [];
  for (i = 0; i < array.length; i++) {
    var number = array[i];
    var result = eval(`${number}${op}${arg}`);

    emptyArr[emptyArr.length] = result;
  }

  return emptyArr;
} */

function map(array, expression) {
  if (arguments.length === 0) throw TypeError('missing argument when calling function map');

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var result = [];
  for (var i = 0; i < array.length; i++)
      result[i] = expression(array[i], i, array);

  return result;
}