
function concatAll(arr1,arr2){
  if(arr1===undefined||arr2===undefined)throw TypeError("ERROR variable no definida")





  result=[];

  for(var i in arr1){
    result[result.length]=(arr1[i]);
  }
  for(var i in arr2){
    result[result.length]=(arr2[i]);
  }
  return result;

}
