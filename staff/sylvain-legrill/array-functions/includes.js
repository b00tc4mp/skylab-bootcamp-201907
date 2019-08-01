function includes(array, value){
    
    if (arguments.length === 0) throw TypeError('no tienen length o length = 0');
    
    if (!(array instanceof Array)) throw TypeError("la cosa " + array + "no es un array");
    
    
    
    
    var a = 0;
    
    for(i=0; i<array.length; i++){
      
        if(array[i] == value){
            a++;
        }  
    }
    switch(a){
        case a = 1:
            // console.log(`Array includes ${value}`);
            console.log(true);
            break;
        case a = 0:
            // console.log(`Array NOT includes ${value}`);
            console.log(false);
            break;
    }   
}