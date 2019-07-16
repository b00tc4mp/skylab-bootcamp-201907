function filter(arr,value){
  var result=[];
  for(var i in arr){
    if(arr[i]===value){
      result.push(arr[i]);
    }
  }
  return result;
}





// var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// const result = words.filter(word => word.length > 6);

// console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
