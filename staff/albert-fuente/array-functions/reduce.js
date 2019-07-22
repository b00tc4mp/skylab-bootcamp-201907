
function reduce(arr,expression){
  var result=0;
  var count=0;
  for(var i=1;i<arr.length;i++){
    count=expression(arr[i-1],arr[i],i,arr);
    result=count;
    arr[i]=count;
  }
  return result;

}


// var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; });
// total == 6
