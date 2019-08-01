function lastIndexOf(array, element) {
  if (arguments.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    for (var i = array.length+1; i > 0; i--){     
      if ( array[i] === element ){    
        return i;
      }  
    }
  
  return -1;
}