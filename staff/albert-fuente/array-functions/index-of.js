function indexOf(arr,value){
  var result=[];
  for(var i in arr){
    if(arr[i]==value){
      result=i;
      break;
    }else{
      result=-1;
    }
  }
  return result;
}



// var array = [2, 9, 9];
// array.indexOf(2);     // 0
