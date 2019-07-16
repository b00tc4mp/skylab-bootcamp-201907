/**
 * entries()
 */
function dEntries(arr){
    let res=[];
    for(let i=0;i<arr.length;i++){
        res[i]=i;
        res[i+1]=arr[i]; 
    }
    return res;
}