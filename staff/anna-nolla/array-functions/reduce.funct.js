console.log("\n" + "Function demo reduce()");

function reduce(arr, expression){
    result = null;

    for(i = 0; i < arr.length; i++){
        result += expression(arr[i]);
    }
    return result;
}

function suma(value){
    return value * 10;
}

reduce([1,2,3,4,5], suma);