function map(array, expression) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  var result = [];

  for (var i = 0; i < array.length; i++)
    result[i] = expression(array[i], i, array);

  return result;
}
