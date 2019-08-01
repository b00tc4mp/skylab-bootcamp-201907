var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

var newArray = [];
var count = 0;

function concat (...arg) {
    for (i = 0; i < arg.length; i++) {
        for (j = 0; j < arg[i].length; j++) {
            newArray[count] = arg[i][j];
            count++
        }
    }
    console.log(newArray,'\nexpected function ["a", "b", "c", "d", "e", "f"]');
}

// concat(array1, array2);