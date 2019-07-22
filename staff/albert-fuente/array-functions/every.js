function every(arr,expression){
  var result;
  for(var i=0; i<arr.length;i++){
    if(expression(arr[i]) != true && result != true){
      result=false;
    }else{
      result=true;
    }
  }
  return result;
}
