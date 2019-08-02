function join(array, separator) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  var string = '';
  if (separator == undefined) {
    separator = ',';
  } else if (separator == '') {
    separator = '';
  }

  if (array.length == 1) {
    string = array[0];
    return string;
  } else {
    for (var i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        string += array[i];
      } else {
        string += array[i] + separator;
      }
    }
    return string;
  }
}
