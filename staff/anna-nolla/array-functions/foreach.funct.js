console.log("\n" + "Function demo forEach()");

var arr1 = [1, 2, 3];

function suma(arr){
    var result = [];

    arr = arr +2;
    result.push(arr);
}

// ----------------------------------------

function forEach(arr, expression) {

    for (i = 0; i < arr.length; i++) {
       expression(arr[i]);
    }
    return (result);
}

forEach(arr1, suma);
