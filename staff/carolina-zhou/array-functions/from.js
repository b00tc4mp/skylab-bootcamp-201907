var arr1 = ["foo"];

function from(arr) {
  if (arguments.length === 0) throw TypeError('missing argument when calling function from');
  
  var string = arr[0];
  var newArr = string.split("");
  return newArr;
}