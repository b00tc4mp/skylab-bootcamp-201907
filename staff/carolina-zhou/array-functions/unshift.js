function unshift(array, ...arguments){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var newArray = [];
    var newItems = [...arguments];
    for (var i = 0; i < newItems.length; i++){
        newArray[i] = newItems[i];
    };
    for (var i = 0; i < array.length; i++){
        newArray[i+newItems.length] = array[i];
    };
    return newArray.length;
}