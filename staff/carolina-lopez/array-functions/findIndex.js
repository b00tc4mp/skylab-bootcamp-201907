function findindex(array , op, value){
    for (var i = 0 , l = array.length; i < l ; i++){
        var element = array[i];
        if (eval(`${element}${op}${value}`)){
            return i;
        }
    }
    return undefined;
}