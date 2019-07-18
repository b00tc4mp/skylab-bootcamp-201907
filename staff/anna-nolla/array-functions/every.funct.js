console.log("\n" + "Function demo every()");

function every(arg) {
    count = 0;

    for (i = 0; i < arr1.length; i++) {
        if (arr1[i] < arg) {
            count++;
        }
    }
    if(count === arr1.length){
        return (true);
    }
    else{ return (false) };
}

