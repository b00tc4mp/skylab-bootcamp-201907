console.log("\n" + "Function demo of()");

function of(){
    var arr = [];
   
    for(i = 0; i < arguments.length; i++){
        arr.push(arguments[i]);
    }
    return arr;  
}

of(1,2,3,4,5);
