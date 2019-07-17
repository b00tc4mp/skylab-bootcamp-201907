function map(array, expression){

  if (arguments.length === 0) throw TypeError('No hay fucking nada dentro');

  if (!(array instanceof Array)) throw TypeError('No es un array loki');

  if (!(expression instanceof Function)) throw TypeError(expression + ' no es una función');


  var result = [];
  for (let i = 0; i < array.length; i++) 
    result[i] = expression(array[i], i, array);
    
  return result;
}

