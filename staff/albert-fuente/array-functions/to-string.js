/**
 * A string representing the elements of the array.
 * 
 * @param {*} arr made to convert an  array, but it can return a string representation of any element.
 * 
 * @throws {TypeError} when length is undefined.
 * @throws {TypeError} when arr is a null object.
 * 
 * @returns a string representing the elements of the array.
 */

function toStringo(arr){
  if (arr === undefined) throw TypeError('No se puede leer la propiedad "length" de undefined');
  if (arr === null) throw TypeError ('No se puede convertir a string un objeto null');

  newstring = '';
  if (typeof arr === 'string'){
      newstring = arr;
  } else {
      for (i = 0; i < arr.length; i++){
          newstring = newstring + arr[i] + ',';
      };
      newstring = newstring.substring(0, (newstring.length-1))
  }
  return newstring;
};