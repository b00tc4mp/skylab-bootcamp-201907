function filter(array , expression){
    if(!arguments.length) throw TypeError('no declared arguments');
    if(!(array instanceof Array))  throw TypeError (array + " is not an array");
    if(!(expression instanceof Function)) throw TypeError(expression + " is not a function");

    var filtered = [];
    for(var i = 0 ; i<array.length ; i++){
        if(expression(array[i])) filtered.push(array[i]);
    };
    return filtered;
};