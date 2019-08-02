/**
 * 
 * @param {Array} array is  the array to check.
 * @throws {TypeError} When input is not an array.
 *
 * 
 */

function every(array, value) {

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
   

    for(var i=0;i<array.length;i++)

    {
        if(array[i]===value){
    
        return true;

    } else  {
        return false;
    }
    }
}