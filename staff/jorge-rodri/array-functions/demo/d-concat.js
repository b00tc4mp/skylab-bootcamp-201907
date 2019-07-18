/**
 * concat()
 * duda Array.prototype
 */
function concatD(arr,arrC){
    if(arguments.length==0) throw ReferenceError("Not param in the function");
    if(!(arr instanceof Array)&&!(arrC instanceof Array)) throw TypeError(" param 'first' or 'second' are not Array");
    var ini=arr.length;
    var count=0;
    var res=arr;
    arr.length=arr.length+arrC.length;
    for(var i=ini;i<arr.length;i++){
        res[i]=arrC[count++]
    }
    return res
}