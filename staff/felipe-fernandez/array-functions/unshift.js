
/* var array1 = [1, 2, 3]; */

function unshifty(arr, ...arguments){
  /*  if (arr === null) throw TypeError (‘La función unshifty debe contener al menos un array seguido de un argumento’); */

   var newArray = [];
   var newItems = [...arguments];
   for (var i = 0; i < arguments.length; i++){
       newArray[i] = newItems[i];
   };
   for (var i = 0; i < arr.length; i++){
       newArray[i+arguments.length] = arr[i];
   };
   arr = newArray;
   console.log(newArray) //BORRAR
   return newArray.length;
}

/* unshifty(array1, 4, 5, 6, 7) */


//versión Manu 
/* 
function unshift(arr) {
    var inc = arguments.length - 1
 
    var length = arr.length
 
    for (var i = length - 1; i >= 0; i--)
        arr[i + inc] = arr[i]
 
    for (var j = 1; j < arguments.length; j++)
        arr[j - 1] = arguments[j]
 
    return arr.length
 }
 
 arr = [1, 2, 3]
 
 unshift(arr, 5, 6) */