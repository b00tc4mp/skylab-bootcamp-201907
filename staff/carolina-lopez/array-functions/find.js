function find (array , op, value){
    for (var i = 0 , l = array.length; i < l ; i++){
        var element = array[i];
        if (eval(`${element}${op}${value}`)){
            return element;
        }
    }
    return undefined;
}