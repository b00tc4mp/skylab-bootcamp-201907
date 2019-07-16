function find(arr,value){
  var result=[];
  for(var i in arr){
    if(arr[i]>value){
      result.push(arr[i]);
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
