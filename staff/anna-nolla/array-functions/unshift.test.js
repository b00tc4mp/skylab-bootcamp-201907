
console.log("\n" + "Function demo (unshift())");

arr1 = [3, 4, 5,];

function unshift(arr, ...arg ){
    var array = arg + "," + arr;
    arr = array.split(",");
    check(arr, [""1", "2", "5", "7", "3", "4", "5"];
}

unshift( arr1, 1, 2, 5, 7);