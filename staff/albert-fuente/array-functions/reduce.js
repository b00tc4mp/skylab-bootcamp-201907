
function reduce(arr){
  var result=0;
  for(var i in arr){
    result=result+arr[i]
  }
  return result;
}


// var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; });
// total == 6
