function find(arr,expression){

  if(!arguments.length) throw TypeError ("ARGUMENTOS NO DECLARADOS");
  if(!(arr instanceof Array)) throw TypeError (" IS NOT AN ARRAY");
  if(!(expression instanceof Function)) throw TypeError (expression + " IS NOT A FUNCTION");

  for(var i in arr){
    if(expression(arr[i])){
      return arr[i];
    }
  }
}




// var array1 = [5, 12, 8, 130, 44];

// var found = array1.find(function(element) {
//   return element > 10;
// });
//
// console.log(found);
// expected output: 12
