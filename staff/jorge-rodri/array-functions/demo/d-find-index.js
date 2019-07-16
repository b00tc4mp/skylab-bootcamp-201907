/**
 *findIndex()
 */
function dFindIndex(arr, fn){
    let res=0;
    for(item in arr){
        console.log("item: "+item);
        if(fn(arr[item])){
            res=item;
            break;
        }
    }
}