console.log('DEMO: forEach');

var array1 = [1, 2, 3, 4];
console.log('array', array1);

console.log('forEach')
var result = forEach(array1);
console.log(result);
console.log(array1); 

forEach2(array1, function(element){
  console.log(element);
});

console.log('expected: \n"a", \"b", \n"c"');

forEach(array2, console.log);

/* EXPRESSION equivale a una funcion, la que está aquí: 
  forEach(array2, console.log);
  equivalente a ...console.log...
*/

array2 = [1, 2, 3]
console.log('arrar', array)

var result = 0;
forEach2(array2, function(value){
  result += value;
});

console.log(result, 'expected: 6');

/* EXPRESSION equivale a una funcion, la que está aquí: 
  var result = 0;
  forEach2(array2, function(value){
  result += value;
  });
  equivalente a ...function(value){
                    result += value;}...
*/

