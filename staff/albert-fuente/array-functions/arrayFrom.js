result=[]
function arrayFrom(array){
  for(var i in array){
<<<<<<< Updated upstream
    result.push(array[i])
  }
  return result
=======
    result[result.length]=array[i];
  }
  return result;
>>>>>>> Stashed changes
}
