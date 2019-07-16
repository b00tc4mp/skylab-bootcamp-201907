var arr = [1, 2, 3, 4];

function map(array, expression) {
  var result = [];

  for (i = 0; i < array.length; i++) {
    result[i] = expression(array[i]);
  }

  return result;
}
