/**
 * Determines whether an array includes a certain value among its entries,
 * returning true orfalse.
 * 
 * @param {Array} array The array to search within it.
 * @param {number} value Value to find.
 * 
 * @throws {TypeError} When input array length is === 0.
 * @throws {TypeError} When input is not an array.
 * @throws {TypeError} When input value length is === 0.
 * 
 * @returns {Array} A Boolean which is true if the value valueToFind is found within the array.
 * Or false if the value valueToFind is not found within the array.
 */

function includes(array, value){
  if (arguments.length === 0) throw TypeError('missing argument 0 when calling function');
  
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  
  if (value.length === 0) throw TypeError('there is nothing to find inside the array');


  for(var i=0; i<array.length; i++){
       var test = false;

      if(array[i] == value){
      test = true;
      }

  }
  return test;

}
