/**
 * Method determines if the element it is included in the array or not. Returns a boolean.
 * @param {*} arr The array given.
 * @param {*} element The element to find in the array.
 */


function includes(arr,element) {
  var result;

  for(var i = 0; i < arr.length; i++) {

      if(arr[i]===element) result = true;
      else if(arr[i] !== element && result === true) result = true;
      else result = false;
  
  } return result;
}; 
