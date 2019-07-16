/**
 * join
 */
function dJoin(arr){
    let res="";
    for(let i=0;i<arr.length;i++){
        res+=arr[i]
        i<arr.length-1?res+=",":null;
    }
    return res;
}