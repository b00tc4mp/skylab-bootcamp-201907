
function map(array, op, arg) {
  var emptyArr = [];

  for (i = 0; i < array.length; i++) {
    var number = array[i];
    var result = eval(`${number}${op}${arg}`);

    emptyArr[emptyArr.length] = result;
  }

  return emptyArr;
}

// -------------- MANU -------------- //

function map(array, expression){
  var result = [];

  for(var i = 0; i < array.length; i++)
    result[i] = expression 
}

