function toString(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    newString = '';
    for (i = 0; i < array.length; i++){
        newString = newString + array[i] + ',';
    };
    newString = newString.substring(0, (newString.length-1))
    return newString;
};