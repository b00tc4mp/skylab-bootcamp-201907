console.log("\n" + "Function demo filter()");

function filter(arr, expresion){
    var result = [];
    if(!(arr instanceof Array)) {
        throw TypeError("This is not an array");
    }

    for(var i = 0; i < arr.length; i++){
        if(expresion(arr[i])){
            result.push(arr[i]);
        }
    }
    return result;
}


// ----------------------

function mayor (value){
   return value <=2;
}

filter([1,2,4,6,7], mayor);

