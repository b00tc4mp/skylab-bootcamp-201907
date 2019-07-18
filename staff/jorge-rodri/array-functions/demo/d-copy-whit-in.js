/**
 * copyWhitin()
 */
function copyWhitinD(target,start,end,arr){
    if(target==undefined||start==undefined||end==undefined||arr==undefined)throw ReferenceError("Missing params.");
    if(!(arr instanceof Array))throw TypeError("The type of param arr is not Array");
    if(!(typeof start=="number")&&!(typeof end=="number"))throw TypeError("'start' or 'end' are not params.");
    var res=[];
    var count=0;
    for(var i=start;i<end+1;i++){
        aux[i]=arr[i];
    }
    for(var i=target;i<aux.length;i++){
        res[i]=aux[count++];
    }
    return res;
}