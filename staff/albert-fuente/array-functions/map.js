
function map(arr,func){
  result=[];
  for(var i in arr){
    if(func){
      result.push(arr[i]);
    }else{
      result.push(arr[i]);
    }
  }
  return result;
}




// var numbers = [1, 5, 10, 15];
// var doubles = numbers.map(function(x) {
//    return x * 2;
// });
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]
