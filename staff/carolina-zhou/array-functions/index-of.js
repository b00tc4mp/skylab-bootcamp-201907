function indexOf(array, name) {
    if (arguments.length === 0) throw TypeError('missing argument when calling function indexOf');

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    for (var i = 0; i < array.length; i++) {
      if (name === array[i]) {
        return i;
      } else if (i == array.length - 1) {
        return -1;
      }
    }
  }