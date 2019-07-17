/**
 * concat()
 * duda Array.prototype
 */
function concatD(arr,arrC){
    if(arr==undefined&&arrC==undefined) throw ReferenceError("Not param in the function");
    if(!(arr instanceof Array)) throw TypeError("First param is not Array");
    if(!(arrC instanceof Array)) throw TypeError("Second param is not Array");
    let ini=arr.length;
    let count=0;
    arr.length=arr.length+arrC.length;
    for(let i=ini;i<arr.length;i++){
        arr[i]=arrC[count++]
    }
    return arr
}
