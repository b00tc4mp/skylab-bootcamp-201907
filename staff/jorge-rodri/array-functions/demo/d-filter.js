/**
 * filter
 */
function dFilter(arr, fn){
    let res=[];
    let count=0;
    for(let i=0;i<arr.length;i++){
        if(fn(arr[i])){
            res[count++]=arr[i];
        }else{
            continue;
        }
    }
    return res;
}