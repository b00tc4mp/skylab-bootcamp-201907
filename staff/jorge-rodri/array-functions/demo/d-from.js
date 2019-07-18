/* *
 * from()
 */
function fromD(arr, mp){
    var res=[];
    for(var i=0;i<arr.length;i++){
        res[i]=mp(arr[i]);
    }
    return res;
}