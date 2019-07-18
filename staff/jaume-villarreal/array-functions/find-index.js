function findIndex(array , expression){
    if(!arguments.length) throw TypeError ('missing argument 0 when calling function');
    if(!(array instanceof Array)) throw TypeError(`${array} is not an array`);
    if(!(expression instanceof Function)) throw TypeError (`${expression} is not a function`);

    for(var i=0 ; i<array.length ; i++){
        if(expression(array[i])) return i;
    };
    return -1;
};