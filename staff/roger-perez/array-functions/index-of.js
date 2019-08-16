function indexOf(array, element) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an Array');
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function indexOf');

    for (var i = 0; i < array.length; i++){
        if(array[i] == element){
           return i;
        } 
    }
    return -1;
}