console.log("\n" + "Function demo map()");

function map(arr, expression){
    var result = [];

    for(i = 0; i < arr.length; i++){
        result.push(expression(arr[i]));
    }
    return result;
}
map(arr1, suma);

// ----------------------------

function suma(value){
    return value * 10;
}