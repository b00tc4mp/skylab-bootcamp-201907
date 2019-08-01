/**
 * Executed a reducer function on each element of the array, resulting a single output value.
 * @param {*} arr The array to reduce.
 */

function reduce(arr) {
var acc=0;
for (var i = 0; i < arr.length; i++) {
   acc += arr[i];
 } return acc;
}
