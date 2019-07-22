
function reverse(arr){
  result=[];
  for(var i=arr.length-1;i>=0;i--){
    result.push(arr[i]);
  }
  arr=result;
  return arr;

}

//
// var array1 = ['one', 'two', 'three'];
// console.log('array1: ', array1);
// // expected output: Array ['one', 'two', 'three']
//
// var reversed = array1.reverse();
// console.log('reversed: ', reversed);
// expected output: Array ['three', 'two', 'one']
