/**
 * forEach()
 */
function dForEach(arr, expression){
    for(var i=0;i<arr.length;i++){
        expression(arr[i]);
    }
}