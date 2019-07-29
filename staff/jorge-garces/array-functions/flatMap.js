function flatMap(array, op1, arg) {
    var newArr = [];
    var newArr2 = [];
    for(i=0; i<array.length; i++){
        var map = eval(`${array[i]}${op1}${arg}`);
        var arr = [newArr[i] =+ map];
        newArr2[i] = arr;
    }
    return newArr2;
}
       
