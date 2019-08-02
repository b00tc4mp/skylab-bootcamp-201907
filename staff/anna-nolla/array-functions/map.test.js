console.log("\n" + "Function demo (map())");

var arr1 = [1, 2, 3, 4, 5];
var result = [];
function suma(arr){
    arr = arr * 10;
    result.push(arr);
}

function map(arr, expression){
    for(i = 0; i < arr.length; i++){
        expression(arr[i]);
    }
    check(result, [10, 20, 30, 40, 50]);
}
map(arr1, suma);
