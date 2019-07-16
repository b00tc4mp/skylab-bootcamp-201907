function find(arr,expression){
  var result=[];
  for(var i in arr){
    if(expression(arr[i])){
      result.push(arr[i]);
      break;
    }
  }
  return result;
}




// var array1 = [5, 12, 8, 130, 44];

// var found = array1.find(function(element) {
//   return element > 10;
// });
//
// console.log(found);
// expected output: 12
