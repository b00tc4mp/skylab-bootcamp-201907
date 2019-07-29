/**
 * Funcion que nos devuelve un array con los elementos que cumplen la condición que se encuentra
 * dentro de la funcion
 * @param {*} arr array sobre el que vamos a operar 
 * @param {*} fn funcion que devuelve un true en caso de que el elemento del array cumpla
 * la condicion que esta dentro de la funcion
 */
function dFilter(arr, fn){
    if(arguments.length==0)throw ReferenceError("Not arguments in the function");
    if(!(arr instanceof Array) && !(typeof fn=='function'))throw TypeError('Error of type of variable.')
    var res=[];
    var count=0;
    for(var i=0;i<arr.length;i++){
        if(fn(arr[i])){
            res[count++]=arr[i];
        }else{
            continue;
        }
    }
    return res;
}