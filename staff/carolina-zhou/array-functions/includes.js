var result;

function includes(array, value){
    var a = 0;
    for(i=0; i<array.length; i++){
        if(array[i] === value){
            a++;
        }  
    }
    if (a >= 0) {
        return true;
    } if (a = 0) {
        return false;
    }
}