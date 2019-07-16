/**
 * concat()
 * duda Array.prototype
 */
function concatD(arr,arrC){
    let ini=arr.length;
    let count=0;
    arr.length=arr.length+arrC.length;
    for(let i=ini;i<arr.length;i++){
        arr[i]=arrC[count++]
    }
    return arr
}
