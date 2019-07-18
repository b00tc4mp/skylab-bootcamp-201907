/**
 * The map method creates a new array
 * with the results of calling a provided function
 * on every element in the calling array.
 * 
 * @param {Array} array The calling array
 * @param {Function} expression The provided function
 * 
 * @returns {Array} A mapped array
 * 
 */

 function map(array , expression){
    if(!arguments.length) throw TypeError ('no declared arguments'); 
    if(!(array instanceof Array)) throw TypeError ('expected array'); 
    if(!(expression instanceof Function)) throw TypeError ('expected function');
    
    var mappedArray = [];
     for(var i=0 , l=array.length ; i<l ; i++){
       mappedArray[i] = expression(array[i]);
     }
     return mappedArray;
 };