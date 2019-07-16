function forEach(array, expression) {
  if (arguments === 0) throw TypeError("Missing argument 0");

  for (var i = 0; i < array.length; i++) expression(array[i], i, array);
}
