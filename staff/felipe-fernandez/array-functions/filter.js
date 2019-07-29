
function filter(array, condition) {

newarrays=[];

if (condition){

    for(var i=0;i<array.length;i++){
        
        if (array[i].length > condition){
            newarrays += array[i] + ' ';
        }
     }
     array=newarrays;
     return  array;
    }
 else {
        
    array=[];
    return  array;
        }

}


    
