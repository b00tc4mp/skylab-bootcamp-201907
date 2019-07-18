function map(array, expression) {
  var result = [];

  for (var i = 0; i < array.length; i++)
      result[i] = expression(array[i], i, array);

  return result;
}

// var numbers = [1, 5, 10, 15];
// var doubles = numbers.map(function(x) {
//    return x * 2;
// });
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]
