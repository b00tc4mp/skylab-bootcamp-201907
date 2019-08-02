function join (array, separator) {
  if (!(array instanceof Array)) throw TypeError('argument is not an array');
  accumulator = '';
  if (separator === undefined) separator = ",";
  for (var i=0; i<array.length; i++) {
          if (array[i] === undefined || array[i] === null) array[i] = '';
          if (i === (array.length -1)) accumulator += array[i];
          else accumulator += array[i] + separator;
      }
  return accumulator;
}