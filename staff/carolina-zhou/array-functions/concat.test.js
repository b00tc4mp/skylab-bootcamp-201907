console.log('TEST concat');

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

var newArray = array1.concat(array2);
check(newArray, ["a", "b", "c", "d", "e", "f"]);