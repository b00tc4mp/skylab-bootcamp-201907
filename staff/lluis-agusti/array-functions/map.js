function map(array, expression) {

if (arguments.length === 0) throw TypeError("no tiene nada! Empty fucking cat");

if (!(array instanceof Array)) throw TypeError("no es un array y si no es un array no se puede recorrer");

if (!(expression instanceof Function)) throw TypeError(expression + "no es una función");


  var result = [];
  for (var i = 0; i < array.length; i++)
      result[i] = expression(array[i], i, array);
  return result;
}