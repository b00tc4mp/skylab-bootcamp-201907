function join(array, separator) {
  var string = '';
  if (separator == '' || separator == undefined) {
    separator = ',';
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
