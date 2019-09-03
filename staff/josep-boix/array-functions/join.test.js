//The join() method creates and returns a new string by concatenating all of the elements
//in an array (or an array-like object), separated by commas or a specified separator string.
// If the array has only one item, then that item will be returned without using the separator.

console.log("TEST: join")

//concatenate elements in a new string + specific separator;
var array = [1,2,3,4,5];
var separator = '$';

join(array,separator);

check(array,'1$2$3$4$5');

//separator is not a String
var array = [1,2,3,4,5];
var separator = 8;

join (array, separator);

check(array, '182838485');

//If array is only 1 argument
var array = [1]

join (array);

check(array,'1');
