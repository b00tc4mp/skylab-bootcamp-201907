/** 
 * sort
 */
function dSort(arr){
    let res;
    let l=arr.length;
    for(let i=0;i<l;i++){
        for(let j=0;j<l-1-i;j++){
            if(arr[j]>arr[j+1]){
                [ arr[j], arr[j+1] ]=[ arr[j+1], arr[j] ];
            }
        }
    }
    return arr;
}