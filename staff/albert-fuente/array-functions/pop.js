function pop(array){
  if (arguments.length === 0) throw TypeError('ERROR missing argument 0 when calling function forEach');
  if (!(array instanceof Array)) throw TypeError(array + 'ERROR is not an array');



  var last=array[array.length-1];
  array.length=array.length-1;
  return last;
}
