/**
 * Method to reverse the array. It returns the array modified. The last input becomes the first.
 * @param {*} arr The array to do the changes.
 */

function reverse(arr){
    var result= [];
    for(var i = arr.length -1; i>= 0; i--)
    result.push(arr[i]);
    
    return result;
}


