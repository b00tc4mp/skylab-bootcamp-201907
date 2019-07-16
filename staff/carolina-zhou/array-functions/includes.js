function includes(array, value){
    var a = 0;
    for(i=0; i<array.length; i++){
        if(array[i] == value){
            a++;
        }  
    }

    switch(a){
        case a = 1:
            true;
            break;
        case a = 0:
            false;
            break;
    }   
}