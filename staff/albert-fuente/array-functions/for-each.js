/* function forEach(array, expression) {
  for (var i = 0; i < array.length; i++)
      expression(array[i], i, array);
}
 */


function forEach(array, expression) {
  if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for (var i = 0; i < array.length; i++)
      expression(array[i], i, array);
}


/* 
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});
 */
// expected output: "a"
// expected output: "b"
// expected output: "c"
