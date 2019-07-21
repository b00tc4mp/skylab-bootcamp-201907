/**
 * Method returns a new string concatening all elements with a separator introduced. If is not introduced () or it is (',') (''), it returns the elements separated with coma.
 * @param {*} arr The array to modificate.
 * @param {*} separator The element to add and use to separate each element.
 */

function join(arr , separator) {
    result= '';
    if(separator == ''|| separator == undefined) separator =',';

    if(arr.length == 1) result =arr[0];
    else {
        for ( var i = 0; i < arr.length; i++ )
            if ( i == arr.length -1 ) result += arr[i];
            else result += arr[i] + separator;
    }return result;

};







