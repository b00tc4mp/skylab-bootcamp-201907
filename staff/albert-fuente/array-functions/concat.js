
function concatAll(arr1,arr2){
  result=[];

  for(var i in arr1){
<<<<<<< Updated upstream
    result.push(arr1[i])
  }
  for(var i in arr2){
    result.push(arr2[i])
  }
  return result
=======
    result[result.length]=(arr1[i]);
  }
  for(var i in arr2){
    result[result.length]=(arr2[i]);
  }
  return result;
>>>>>>> Stashed changes

}
