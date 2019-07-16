function findIx(arr,value){
  var result=[];
  for(var i in arr){
    if(arr[i]>value){
      result=i;
      break;
    }
  }
  return result;
}



// var array1 = [5, 12, 8, 130, 44];

// function isLargeNumber(element) {
//   return element > 13;
// }
//
// console.log(array1.findIndex(isLargeNumber));
// expected output: 3
