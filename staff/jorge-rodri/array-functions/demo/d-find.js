/**
 * find()
 */
function dFind(arr, fn){
    var res;
    for(item in arr){
        if(fn(arr[item])){
            res=arr[item];
            break;
        }
    }
    return res;
}