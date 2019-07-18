function includes(array, value){
    var a = 0;
    
    for(i=0; i<array.length; i++){
      
        if(array[i] == value){
            a++;
        }  
    }

    switch(a){
        case a = 1:
            console.log(`Array includes ${value}`);
            console.log(true);
            break;
        case a = 0:
            console.log(`Array NOT includes ${value}`);
            console.log(false);
            break;
    }   
}

// function includes(array, value){
//     var a = 0;
    
//     for(i=0; i<array.length; i++){
      
//         if(array[i] == value){
//             return true;
//         };
//     };

//     return false;
// }