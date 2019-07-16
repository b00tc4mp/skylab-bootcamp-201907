var array = [ 0, 1, 2, 3, 4, 5, 6, 7];
var newArray = [];
var count = 0;
var count2 = 0;

function copyWithin (target, start, end) {
    for (var i = start; i < end; i++) {
        newArray[count] = array[i];
        count++;
    }
    
    for (var i = 0; i < newArray.length; i++) {
        array[target] = newArray[count2];
        count2++;
        target++;
    }

    console.log(array);
}

// copyWithin (0, 2, 4);