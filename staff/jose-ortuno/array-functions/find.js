function find (array , expression){
    if (arguments.length === 0) throw TypeError ('missing argument when calling function find');
    
    for (var i = 0 , l = array.length; i < l ; i++){
        if (expression(array[i])) return array[i];
    }
}