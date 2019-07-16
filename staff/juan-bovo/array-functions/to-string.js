//A string representing the elements of the array.

//var array1 = [1, 2, 'a', '1a'];
// expected output: "1,2,a,1a"

//array1 = [1, 2, 'a', '1a'];

function toString(arr){
    newstring = '';
    for (i = 0; i < arr.length; i++){
        newstring = newstring + arr[i] + ',';
    };
    newstring = newstring.substring(0, (newstring.length-1))
    return newstring;
};