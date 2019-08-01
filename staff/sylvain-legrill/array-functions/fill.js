function fill(array, value, start, end) {
    
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function fill');
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');


    var i=0;
    var j=0;
    
    if (end){
       
        j=start;
       
        for (j; j<end; j++){
          
          array[j]=value;
       
        }
        return array;
          
    } 

    else if (start){

        i=start;
      
        for (i; i<array.length-1; i++){
            array[i]=value;
        }

        return  array;

    } else   
        {
        for (var i=0; i<array.length-1; i++){
        
            array[i]=value;

        }

        return  array;
    }
}