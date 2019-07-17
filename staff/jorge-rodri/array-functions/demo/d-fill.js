/**
 * fill()
 */
function dFill(value, start, end, arr){
    if(value==undefined||start==undefined||end==undefined||arr==undefined) throw ReferenceError("Faltan parametros.");
    if(!(typeof start === 'number')||!(typeof end === 'number')) throw TypeError("Parametro 'start' o 'end' no es un número.");
    if(!(arr instanceof Array)) throw TypeError("No es un array.");
    let res=arr;
    for(let i=start;i<(end+1);i++){
        res[i]=value;
    }
    return res;
}