/**
 * find()
 */
function dFind(arr, fn){
    let res;
    for(item in arr){
        if(fn(arr[item])){
            res=arr[item];
            break;
        }
    }
    return res;
}