function every(array, value) {
    var acc = 0
    for(var i=0;i<array.length;i++){
        if(array[i]===value){
            acc++;
        }
    };
    return acc === array.length;
};