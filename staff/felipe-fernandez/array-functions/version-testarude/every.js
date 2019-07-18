function every(array, expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function every');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');


    for(var i=0;i<array.length;i++) {
        if(!expression(array[i])){
     
            return false;

        } 
    }
    return true;
}


