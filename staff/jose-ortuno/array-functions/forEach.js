function forEach(arr, expression){
  if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for(i = 0; i < arr.length; i++){
    expression(arr[i], i, arr);
  }
}