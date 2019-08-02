console.log("\n" + "Function demo every()");

function every(arr, expresion){
    if(!(arr instanceof Array)) {
        throw TypeError("This is not an array");
    }

    for(var i = 0; i < arr.length; i++){
        if(expresion(arr[i]) !== true){
            return false;
        }
        else {continue;}
    }
    return true;
}

// ------------------------------------

function mayor(value){
    return value > 5;
}

every([1,2,3,4,5,6,7,8,9], mayor);