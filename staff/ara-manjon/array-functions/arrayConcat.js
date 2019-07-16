function arrayConcat(array1, array2) {
    var arraySum = [];

    for(var i=0; i<array1.length; i++){
        arraySum.push(array1[i])
    }

    for(var i=0; i<array2.length; i++){
        arraySum.push(array2[i])
    }
    

    return arraySum;
} 