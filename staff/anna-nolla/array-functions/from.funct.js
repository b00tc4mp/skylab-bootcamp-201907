console.log("\n" + "Function demo from()");

function from(arg, expresion){
    var arr = [];
   
    if (expresion === undefined){
        for(i = 0; i < arg.length; i++){
            arr.push(arg[i]);
        }
        return arr;
    }

    for(i = 0; i < arg.length; i++){
        arr.push(expresion(arg[i]));
    }
    return arr;
}

function suma(value){
    return value * 10;
}

from("12345");
from(("1234"), suma);