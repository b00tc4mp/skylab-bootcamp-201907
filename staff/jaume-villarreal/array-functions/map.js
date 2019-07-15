var arr = [1, 2, 3, 4];

function map(array, op, arg) {
  var newArr = [];

  for (i = 0; i < array.length; i++) {
    var number = array[i];
    var result = eval(`${number}${op}${arg}`);

    newArr[newArr.length] = result;
  }

  return newArr;
}