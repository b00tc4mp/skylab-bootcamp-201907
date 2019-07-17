function push(array,value){
  if (arguments.length === 0) throw TypeError('ERROR!!!!missing argument 0 when calling function forEach');

  array[array.length]=value;
  return array.length;

}
