var arr = [1, 2, 3, 4];

function map(array, op, arg) {
  var emptyArr = [];

  for (i = 0; i < array.length; i++) {
    var number = array[i];
    var result = eval(`${number}${op}${arg}`);

    emptyArr[emptyArr.length] = result;
  }

  return emptyArr;
}
