var array1 = [1, 2, 3];

function unshift(arr, ...arguments){
    console.log(arr)
    var newArray = [];
    var newItems = [...arguments];
    for (var i = 0; i < newItems.length; i++){
        newArray[i] = newItems[i];
    };
    for (var i = 0; i < arr.length; i++){
        newArray[i+newItems.length] = arr[i];
    };
    array1 = newArray;
    return newArray.length;
}

unshift(array1, 4, 5);