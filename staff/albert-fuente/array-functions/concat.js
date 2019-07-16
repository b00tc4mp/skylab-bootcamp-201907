
function concatAll(arr1,arr2){
  result=[];

  for(var i in arr1){
    result[result.length]=(arr1[i]);
  }
  for(var i in arr2){
    result[result.length]=(arr2[i]);
  }
  return result;

}
