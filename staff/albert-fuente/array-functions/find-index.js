function findIx(arr,expression){
  for(var i=0;i<arr.length;i++){
    if(expression(arr[i])){
      return i;

    }
  }
}



// var array1 = [5, 12, 8, 130, 44];

// function isLargeNumber(element) {
//   return element > 13;
// }
//
// console.log(array1.findIndex(isLargeNumber));
// expected output: 3
