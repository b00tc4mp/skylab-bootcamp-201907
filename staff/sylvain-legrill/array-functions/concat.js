

function concat (array1,array2) {

    var newArray = [];
    var newArray2 =[]
    var count = 0;

    for (i = 0; i < array1.length; i++) {
        for (j = 0; j < array1[i].length; j++) {
            newArray[count] = array[i][j];
            count++
        }
    }
    console.log(newArray,'\nexpected function ["a", "b", "c", "d", "e", "f"]');
}

concat(['a', 'b', 'c'], ['d', 'e', 'f']);