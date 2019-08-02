function lastIndexOf(arr,value){
  var result="";
  for(var i in arr){
    if(arr[i]==value){
      result=i;
    }
  }
  return result;
}


// var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

// console.log(animals.lastIndexOf('Dodo'));
// expected output: 3
