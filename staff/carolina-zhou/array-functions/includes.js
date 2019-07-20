function includes(array, value){
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var a = 0;
    for(i=0; i<array.length; i++){
        if(array[i] === value){
            a++;
        }  
    }
    if (a >= 0) {
        return true;
    } if (a = 0) {
        return false;
    }
}
