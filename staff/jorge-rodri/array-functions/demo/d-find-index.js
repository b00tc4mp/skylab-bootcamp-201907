/**
 *findIndex()
 */
function dFindIndex(arr, fn){
    var res=0;
    for(item in arr){
        console.log("item: "+item);
        if(fn(arr[item])){
            res=item;
            break;
        }
    }
}