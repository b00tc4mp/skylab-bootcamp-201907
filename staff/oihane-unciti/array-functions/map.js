

function map(array, expression) {
  var result =[];

  for (var i = 0; i < array.length; i++) 
    result[i]= expression(array[i]);

  return result;
}


// seria igual que --> var map1 = array1.map(x => x * 2);