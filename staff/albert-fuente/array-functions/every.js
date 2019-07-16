<<<<<<< Updated upstream
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

// var array1 = [1, 30, 39, 29, 10, 13];

function every(arr){
  for(var i in arr){
    if(isBelowThreshold(arr[i])){
      return true;
    }else{
      return false;
    }
  }
}
// expected output: true
=======
function every(arr,condition){
  var result
  for(var i=0; i<arr.length;i++){
    if(condition(arr[i]) != true && result != true){
      result=false;
    }else{
      result=true;
    }
  }
  return result;
}
>>>>>>> Stashed changes
