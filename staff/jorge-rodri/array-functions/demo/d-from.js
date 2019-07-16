/* *
 * from()
 */
function fromD(arr, mp){
    let res=[];
    for(let i=0;i<arr.length;i++){
        res[i]=mp(arr[i]);
    }
    return res;
}