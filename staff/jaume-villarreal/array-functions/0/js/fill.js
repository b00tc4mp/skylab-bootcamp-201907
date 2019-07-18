function fill(array, value, start, end) {

    var i=0;
    var j=0;

    if (end){

        j=start;
       
        for (j; j<end; j++){
            array[j]=value;
        }
        //  debugger
        return  array[j]=value;
        
    } 

    else if (start){

        i=start-1;

        for (i; i<array.length-1; i++){
            array[i]=value;
        }

        return  array[i]=value;

    } else 
    
        {

        for (var i=0; i<array.length-1; i++){
            array[i]=value;
        }

        return  array[i]=value;
    }
}