
function forEach(array, expresion){
    for(var i=0; i<= array.length; i++)
        expresion(array[i], i, array);
}