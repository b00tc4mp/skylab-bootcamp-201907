function map(array, expression) {

  if(arguments.length === 0) throw TypeError ("No hay nada dentro");
  if (!(array instanceof Array)) throw TypeError ("No es un array");
  if(!(expression instanceof Function)) throw TypeError("No es una función");

  var result =[];
  for (var i = 0; i < array.length; i++) 
    result[i]= expression(array[i], i, array);

  return result;
}


// seria igual que --> var map1 = array1.map(x => x * 2);