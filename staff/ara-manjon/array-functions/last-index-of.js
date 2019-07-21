/**
 * Method return the last index at which a given element can be found in the array.
 */



var array = ['a', 'k', 'a', 'k', 'a', 'k', 'k'];



function lastIndexOf (array,element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');

    for (var i = array.length+1; i > 0; i--){     
        if ( array[i] === element ){    
          return i;
        }  
      }
    return -1;
};