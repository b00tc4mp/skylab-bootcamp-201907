/**
 * entries()
 */
function dEntries(arr){
    if(arr==undefined)throw ReferenceError("No hay parametro")
    if(!(arr instanceof Array))throw TypeError("No es un array");
    let res=[];
    for(let i=0;i<arr.length;i++){
        res[i]=i;
        res[i+1]=arr[i]; 
    }
    return res;
}