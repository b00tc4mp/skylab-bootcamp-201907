/**
 * includes
 */
function dIncludes(arr,searchElement, index){
    let res=false;
    for(let i=index;i<arr.length;i++){
        arr[i]==searchElement?res=true:null;
    }
    return res;
}