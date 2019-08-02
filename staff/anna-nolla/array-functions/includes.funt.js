console.log("\n" + "Function demo includes()");

// da verdadero o falso segun este el elemento dento del array.

function includes (arr, argument, index){

    if(!(arr instanceof Array)) {
        throw TypeError("This is not an array");
    }
    if (index === undefined){
        index = 0;
    }

    if (index < 0){
        index = arr.length + index;
    }

    for(var i = index; i < arr.length; i++){

        if(argument === arr[i]){
            return true
        }
        else{ continue;   
        }
    }
    return false;
}