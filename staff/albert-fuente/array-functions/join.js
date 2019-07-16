
function join(arr){
  result="";
  for(var i in arr){
    for(var j in arr[i])
    result+=(arr[i][j]);
  }
  return result;
}


//
// var elements = ['Fire', 'Air', 'Water'];
//
// console.log(elements.join());
// expected output: "Fire,Air,Water"
