console.log("\n" + "Function demo (forEach())");

var arr1 = [1, 2, 3];
var result = [];

function suma(arr){
    arr = arr +2;
    result.push(arr);
}

function forEach(arr, expression) {
    for (i = 0; i < arr.length; i++) {
       expression(arr[i]);
    }
    check(result, [3, 4, 5]);
}

forEach(arr1, suma);



