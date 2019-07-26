function indexOf(array, name) {
  if (arguments.length === 0) throw Error('indexOf is not defined');
  if (!(array instanceof Array)) throw TypeError(array + ' cant be a number');

  for (var i = 0; i < array.length; i++) {
    if (name === array[i]) {
      return i;
    } else if (i == array.length - 1 || name == undefined) {
      return -1;
    }
  }
}



