function toString(arr){
  result=[];
  for(var i in arr){
    result.push(`${arr[i]}`)
  }
  return result;
}


// var array1 = [1, 2, 'a', '1a'];
//
// console.log(array1.toString());
// expected output: "1,2,a,1a"
