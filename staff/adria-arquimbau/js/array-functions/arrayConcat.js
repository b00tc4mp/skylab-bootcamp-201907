function arrayConcat(array1, array2) {

    if (!(array1 instanceof Array) )  throw TypeError ("The first item is not an array");
    if (!(array2 instanceof Array) )  throw TypeError ("The second item is not an array");
    
    var arraySum = [];

    for(var i=0; i<array1.length; i++){
        arraySum.push(array1[i]);
    }

    for(var i=0; i<array2.length; i++){
        arraySum.push(array2[i]);
    }
    

    return arraySum;
} 
