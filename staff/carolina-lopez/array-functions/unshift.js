//The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
//var array1 = [1, 2, 3];

//console.log(array1.unshift(4, 5));
// expected output: 5

//console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]

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
    console.log(array1) //BORRAR
    return newArray.length;
}

unshift(array1, 4, 5);
