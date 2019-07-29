/** 
 * sort
 */
function dSort(arr){
    var res;
    var l=arr.length;
    for(var i=0;i<l;i++){
        for(var j=0;j<l-1-i;j++){
            if(arr[j]>arr[j+1]){
                [ arr[j], arr[j+1] ]=[ arr[j+1], arr[j] ];
            }
        }
    }
    return arr;
}