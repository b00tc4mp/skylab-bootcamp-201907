function keys(arr){
  result=""
  for(var i in arr){
    result+=i;
  }
  return result;
}

//
// var array1 = ['a', 'b', 'c'];
// var iterator = array1.keys();
//
// for (let key of iterator) {
//   console.log(key); // expected output: 0 1 2
// }
