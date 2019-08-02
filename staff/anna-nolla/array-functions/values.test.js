console.log("\n" + "Function demo (values())");

var arr1 = [1, 2, 3, 4, 5];
var result = []; 

function values(arr){
    for (i = 0; i < arr.length; i++){
        result.push(arr[i]);
    }
    check(result, [1, 2, 3, 4, 5]);
}
values(arr1);