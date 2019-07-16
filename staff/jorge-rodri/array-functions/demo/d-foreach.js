/**
 * forEach()
 */
function dForEach(arr, expression){
    for(let i=0;i<arr.length;i++){
        expression(arr[i]);
    }
}