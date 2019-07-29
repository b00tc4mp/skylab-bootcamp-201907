/**
 * includes
 */
function dIncludes(arr,searchElement, index){
    var res=false;
    for(var i=index;i<arr.length;i++){
        arr[i]==searchElement?res=true:null;
    }
    return res;
}