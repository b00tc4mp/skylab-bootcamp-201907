function find (array , expression){
    for (var i = 0 , l = array.length; i < l ; i++){
        if (expression(array[i])) return array[i];
    }
}