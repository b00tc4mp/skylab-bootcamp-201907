/**
 * copyWhitin()
 */
function copyWhitinD(target,start,end,arr){
    let res=[];
    let count=0;
    for(let i=start;i<end+1;i++){
        aux[i]=arr[i];
    }
    for(let i=target;i<aux.length;i++){
        res[i]=aux[count++];
    }
    return res;
}