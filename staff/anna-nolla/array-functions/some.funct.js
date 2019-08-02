console.log("\n" + "Function demo some()");

function some(arr, expresion) {
    if(!(arr instanceof Array)) {
        throw TypeError("This is not an array");
    }

    for(var i = 0; i < arr.length; i++){
        if(expresion(arr[i])){
            return true;
        }
        else{
            continue;
        }
    }
    return false;
}

// ----------------------

function mayor (value){
   return value <=2;
}

some([1,2,4,6,7], mayor);
