function concat(array1, array2) {

    if (!(array1 instanceof Array)) throw TypeError(array1 + ' is not an Array');
    if (!(array2 instanceof Array)) throw TypeError(array2 + ' is not an Array');
  
    var newArray = [];
    
    for (var i = 0; i < array1.length; i++) {
      newArray[i] = array1[i];
    }
    for (var j = 0; j < array2.length; j++) {
      newArray[array1.length + j] = array2[j];
    }
    return newArray;
  }