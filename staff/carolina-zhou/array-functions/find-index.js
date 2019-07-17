function findindex(array, op, value){
    for (var i = 0; i < array.length ; i++){
        var element = array[i];
        if (eval(`${element}${op}${value}`)){
            return i;
        }
    }
    return undefined;
}